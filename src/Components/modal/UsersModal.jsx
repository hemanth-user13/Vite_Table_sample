import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';

function UsersModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        user_id: "",
        user_name: "",
        user_email: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            resetFormData();
        }
    }, [initialData]);

    const resetFormData = () => {
        setFormData({
            user_id: "",
            user_name: "",
            user_email: "",
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const POST_URL = "http://localhost:8000/users";
            const response = await axios.post(POST_URL, formData);
            console.log("User data saved:", response.data);
            onSave(response.data);
            resetFormData(); 
            Swal.fire('User Added!', 'User has been added.', 'success');
            onClose(); 
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? 'Edit User' : 'Add User'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            User ID
                        </label>
                        <input
                            type="number"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            User Name
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            User Email
                        </label>
                        <input
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

UsersModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        user_id: PropTypes.string,
        user_name: PropTypes.string,
        user_email: PropTypes.string,
    }),
};

UsersModal.defaultProps = {
    initialData: null,
};

export default UsersModal;
