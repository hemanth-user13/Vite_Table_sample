// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const ValidationSchema = Yup.object({
    product_name: Yup.string().required('required'),
    category: Yup.string().required('required'),
    price: Yup.number().required('required').positive('Price must be positive'),
    product_dealer: Yup.string().required('required'),
});

function Modal({ isOpen, onClose, onSave, initialData }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? 'Edit Product' : 'Add Product'}
                </h2>
                <Formik
                    initialValues={initialData || { product_name: '', category: '', price: '', product_dealer: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        Swal.fire('Data Edited', 'The Data has been Edited.', 'success');
                        onSave(values);
                        setSubmitting(false);
                    }}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="flex items-start justify-start text-xl font-bold text-gray-700">
                                    Product Name<span className='text-red-700'>*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="product_name"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name="product_name" component="div" className="text-red-500 text-lg flex items-start justify-start" />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-start justify-start text-xl font-bold text-gray-700">
                                    Category<span className='text-red-700'>*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="category"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name="category" component="div" className="text-red-500 text-lg flex items-start justify-start" />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-start justify-start text-xl font-bold text-gray-700">
                                    Price<span className='text-red-700'>*</span>
                                </label>
                                <Field
                                    type="number"
                                    name="price"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-lg flex items-start justify-start" />
                            </div>
                            {/* <div className="mb-4">
                                <label className="flex items-start justify-start text-xl font-bold text-gray-700">
                                    Product Dealer<span className='text-red-700'>*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="product_dealer"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name="product_dealer" component="div" className="text-red-500 text-lg flex items-start justify-start" />
                            </div> */}
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

// Define prop types
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        product_name: PropTypes.string,
        category: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        product_dealer: PropTypes.string,
    }),
};

// Default props if not provided
Modal.defaultProps = {
    initialData: null,
};

export default Modal;
