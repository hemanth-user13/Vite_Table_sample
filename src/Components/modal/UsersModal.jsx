
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UsersModal({ isOpen, onClose, onSave, initialData }) {
    const validationSchema = Yup.object({
        user_id: Yup.number().required('required').positive('ID must be Positive number '),
        user_name: Yup.string()
            .required('required'),
        user_email: Yup.string()
            .email('Invalid email address')
            .required('required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const POST_URL = import.meta.env.VITE_API_USERS;;
            const response = await axios.post(POST_URL, values);
            console.log("User data saved:", response.data);
            onSave(response.data);
            Swal.fire('User Added!', 'User has been added.', 'success');
            onClose(); 
        } catch (error) {
            console.error("Error saving user data:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                    {initialData ? 'Edit User' : 'Add User'}
                </h2>
                <Formik
                    initialValues={initialData || { user_id: "", user_name: "", user_email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="flex items-start justify-start text-xl font-bold text-gray-700">
                                    User ID<span className='text-red-700'>*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="user_id"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name="user_id" component="div" className="text-red-500 text-lg flex items-start justify-start" />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-start justify-start text-xl font-bold text-gray-700">
                                    User Name<span className='text-red-700'>*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="user_name"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name="user_name" component="div" className="text-red-500 text-lg flex items-start justify-start" />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-start justify-start text-xl font-bold text-gray-700">
                                    User Email<span className='text-red-700'>*</span>
                                </label>
                                <Field
                                    type="email"
                                    name="user_email"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name="user_email" component="div" className="text-red-500 text-lg flex items-start justify-start" />
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
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
