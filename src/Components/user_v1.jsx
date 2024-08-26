import { useEffect, useState } from 'react';
import Navbar from './Header/Navbar'
import { useProductProvider } from './ProductSlice';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/solid';
import UserModal from './modal/UsersModal';

function Users() {
    const { userData, setUserData } = useProductProvider();
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [modalData,setModalData]=useState(null)

    const USER_URL = "http://localhost:8000/users"
    const UserData = async () => {
        const response = await axios.get(USER_URL);
        console.log("the user data is", response.data);
        setUserData(response.data)
    }

    //post the user Data 


    useEffect(() => {
        UserData()
    }, [setUserData])

    // const handlEditClick=(userdata)=>{
    //     setModalData(userdata);
    //     setIsModalOpen(true)
    // }

    // const handlesave=(newuserdata)=>{
    //     if(modalData){
    //         setUserData(prevdata=>{
    //             prevdata.map(item=>
    //                 item.id=modalData.id?{...item,...newuserdata}:item
    //             )
    //         })
    //     }
    //     else{
    //         setUserData([...userData,{id:Date.now(),...newuserdata}])
    //     }
    //     setIsModalOpen(false)
    // }
    const handleSave = (newuserdata) => {
        if (modalData) {
            setUserData(prevdata => 
                prevdata.map(item => 
                    item.id === modalData.id ? { ...item, ...newuserdata } : item
                )
            );
        } else {
            setUserData([...userData, { id: Date.now(), ...newuserdata }]);
        }
        setIsModalOpen(false);
    };
    

    return (
        <div>
            <Navbar />
           
           <h2 className='text-3xl font-serif ml-48 my-3' >User List</h2>
           <div className='flex justify-end items-end my-5'>
           <button 
            className='flex items-end ml-96 gap-2  text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2'
            onClick={()=>{
                setModalData(null);
                setIsModalOpen(true)
            }}
            >
                <PlusIcon className='w-4 h-4'/>
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
                        </tr>
                    </thead>
                    {userData.map((user, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                            <td className=" py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        </tr>
                    ))}
                </table>
            ) : (
                <p>No Data Found</p>
            )
            }
            <UserModal 
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)}
            onSave={handleSave}
            initialData={modalData}
            />
        </div>
    )
}

export default Users
