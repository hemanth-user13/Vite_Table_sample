import { useState } from "react";
import PropTypes from 'prop-types';

function UsersModal({ isOpen, onClose, onSave, initialData }) {
    const [formdata, setFormData] = useState({
        user_id: "",
        user_name: "",
        user_email: "",
    })


    // const handleChange=(e)=>{
    //     setFormData({
    //         ...formdata,
    //         [e.target.user_id]:e.target.value,
    //     })

    // }
    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        onSave(formdata)
    }

    if(!isOpen){
        return null
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? 'Edit Product' : 'Add Product'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        User ID
                    </label>
                    <input
                        type="number"
                        name="user_id"
                        value={formdata.user_id}
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
                        value={formdata.user_name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        User email
                    </label>
                    <input
                        type="email"
                        name="user_email"
                        value={formdata.user_email}
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
    )
}

UsersModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        user_id: PropTypes.string,
        user_name: PropTypes.string,
        user_email: PropTypes.string,
    })
}

UsersModal.defaultProps = {
    initialData: null,
}

export default UsersModal
