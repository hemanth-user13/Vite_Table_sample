import { useEffect, useState } from 'react';
import Navbar from './Header/Navbar';
import { useProductProvider } from './ProductSlice';
import axios from 'axios';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import UserModal from './modal/UsersModal';
import Swal from 'sweetalert2';

function Users() {
    const { userData, setUserData } = useProductProvider();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const USER_URL = "http://localhost:8000/users";

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
                <table className="min-w-full bg-white border ml-32">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-9 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                            <th className="px-8 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                            <th className="px-8 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                            <th className="px-8 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                                <td className="py-4 whitespace-nowrap">{user.user_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.user_email}</td>
                                <td className='px-6 py-4'>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
