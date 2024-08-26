import { useEffect, useState } from 'react';
import Navbar from './Header/Navbar';
import { useProductProvider } from './ProductSlice';
import axios from 'axios';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import UserModal from './modal/UsersModal';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';

function Users() {
    const { userData, setUserData } = useProductProvider();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const USER_URL = import.meta.env.VITE_API_USERS;

    const fetchUserData = async () => {
        try {
            const response = await axios.get(USER_URL);
            console.log("The user data is", response.data);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [setUserData]);

    const handleSave = (newUserData) => {
        if (modalData) {
            setUserData(prevData =>
                prevData.map(item =>
                    item.id === modalData.id ? { ...item, ...newUserData } : item
                )
            );
        } else {
            setUserData([...userData, { ...newUserData }]);
        }
        setIsModalOpen(false);
    };

    const deleteUser = (id) => {
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
                axios.delete(`${USER_URL}/${id}`)
                .then(() => {
                    setUserData(userData.filter(user => user.id !== id));
                    Swal.fire('Deleted!', 'User has been deleted.', 'success');
                })
                .catch((error) => {
                    Swal.fire('Error!', 'There was an error deleting the user.', 'error');
                    console.error('There was an error deleting the user:', error);
                });
            
            }
        })
    }

    const columns = [
        { field: 'user_id', headerName: 'User ID', width: 150 },
        { field: 'user_name', headerName: 'User Name', width: 200 },
        { field: 'user_email', headerName: 'User Email', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => deleteUser(params.row.id)}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            ),
        },
    ];

    return (
        <div>
            <Navbar />
            <h2 className='text-3xl font-serif ml-48 my-3'>User List</h2>
            <div className='flex justify-end items-end my-5'>
                <button
                    className='flex items-end ml-96 gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2'
                    onClick={() => {
                        setModalData(null);
                        setIsModalOpen(true);
                    }}
                >
                    <PlusIcon className='w-4 h-4' />
                    Add User
                </button>
            </div>
            {userData.length > 0 ? (
                <div style={{ height: 400, width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <DataGrid
                        rows={userData}
                        columns={columns}
                        disableSelectionOnClick
                        hideFooterPagination
                    />
                </div>
            ) : (
                <p>No Data Found</p>
            )}
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={modalData}
            />
        </div>
    );
}

export default Users;
