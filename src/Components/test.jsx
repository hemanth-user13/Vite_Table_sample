import { useState, useEffect } from 'react';
import NavBar from './Header/Navbar';
import { useProductProvider } from './ProductSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from './modal/modal';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';

function SearchBar() {
    const { searchTerm, setSearchTerm } = useProductProvider();

    return (
        <div className="max-w-md ml-36">
            <input
                type="search"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

function Main() {
    const { data, setData, searchTerm } = useProductProvider();
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const fetchData = async () => {
        const DATA_URL = "http://localhost:8000/products";
        try {
            const response = await axios.get(DATA_URL);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(new Set(filteredData.map(item => item.id)));
        } else {
            setSelectedItems(new Set());
        }
    };

    const handleRowCheckboxChange = (id) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const deleteSelectedProducts = () => {
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
                const newData = data.filter(item => !selectedItems.has(item.id));
                setData(newData);
                setSelectedItems(new Set());
                Swal.fire('Deleted!', 'Selected products have been deleted.', 'success');
            }
        });
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
                setData(data.filter(item => item.id !== id));
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
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
            // Edit mode
            setData(prevData =>
                prevData.map(item =>
                    item.id === modalData.id
                        ? { ...item, ...newProduct }
                        : item
                )
            );
        } else {
            // Add mode
            setData([...data, { id: Date.now(), ...newProduct }]);
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <NavBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <SearchBar />
                        <button
                            className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2"
                            onClick={() => {
                                setModalData(null);
                                setIsModalOpen(true);
                            }}
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedItems.size === filteredData.length}
                                        />
                                    </th>
                                    <th scope="col" className="py-3 px-6">Product Name</th>
                                    <th scope="col" className="py-3 px-6">Category</th>
                                    <th scope="col" className="py-3 px-6">Price</th>
                                    <th scope="col" className="py-3 px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((product) => (
                                    <tr key={product.id} className="bg-white border-b">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.has(product.id)}
                                                onChange={() => handleRowCheckboxChange(product.id)}
                                            />
                                        </td>
                                        <td className="py-4 px-6">{product.product_name}</td>
                                        <td className="py-4 px-6">{product.category}</td>
                                        <td className="py-4 px-6">{product.price}</td>
                                        <td className="py-4 px-6">
                                            <button
                                                className="text-blue-600 hover:text-blue-900 mr-2"
                                                onClick={() => handleEditClick(product)}
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        className="mt-4 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={deleteSelectedProducts}
                        disabled={selectedItems.size === 0}
                    >
                        Delete Selected
                    </button>
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
