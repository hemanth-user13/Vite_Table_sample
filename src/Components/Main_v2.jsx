import { useState, useEffect } from 'react';
import NavBar from './Header/Navbar';
import { useProductProvider } from './ProductSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from './modal/modal';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { DataGrid } from '@mui/x-data-grid';

function SearchBar() {
    const { searchTerm, setSearchTerm } = useProductProvider();

    return (
        <div className="max-w-md ml-36">
            <input
                type="search"
                className="absolute ml-96 top-32 w-1/4 left-4 p-4 mr-48 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

const DATA_URL = "http://localhost:8000/products";

function Main() {
    const { data, setData, searchTerm } = useProductProvider();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(DATA_URL);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${DATA_URL}/${id}`)
                    .then(() => {
                        setData(data.filter(item => item.id !== id));
                        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'There was an error deleting the product.', 'error');
                        console.error('There was an error deleting the product:', error);
                    });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Product_dealer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (product) => {
        setModalData(product);
        setIsModalOpen(true);
    };

    const handleSave = (newProduct) => {
        if (modalData) {
            setData(prevData =>
                prevData.map(item =>
                    item.id === modalData.id
                        ? { ...item, ...newProduct }
                        : item
                )
            );
        } else {
            setData([...data, { id: Date.now(), ...newProduct }]);
        }
        setIsModalOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'Product ID', width: 150 },
        { field: 'product_name', headerName: 'Product Name', width: 200 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'Product_dealer', headerName: 'Product Dealer', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <button
                        className="text-blue-600 hover:text-blue-900 mr-2"
                        onClick={() => handleEditClick(params.row)}
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteProduct(params.row.id)}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </>
            ),
        },
    ];

    return (
        <>
            <NavBar />
            <div className="p-4 sm:ml-64">
                <h1 className='text-4xl text-center my-3 pb-8 ml-10 font-serif'>Product Management</h1>
                <div className="mr-auto">
                    <div className="flex justify-between items-center mb-4">
                        <SearchBar />
                        <button
                            className="flex items-center gap-2 ml-80 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2"
                            onClick={() => {
                                setModalData(null);
                                setIsModalOpen(true);
                            }}
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>

                    <div style={{ height:'100%', width: '120%'}}>
                        <DataGrid
                            rows={filteredData}
                            columns={columns}
                            disableSelectionOnClick
                            hideFooterPagination
                            
                        />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={modalData}
            />
        </>
    );
}

export default Main;
