import { useLocation } from 'react-router-dom'
import Navbar from './Header/Navbar'

function Product() {
    const location = useLocation();
    const { product } = location.state || {};


    if (!product) {
        return <p>No Product Details</p>
    }
    return (
        <div>
            <Navbar />
            <h1 className='text-4xl font-serif text-center my-2 mb-20 pl-48'>Product Details</h1>
            <div className='ml-32'>
                <div className='max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold mb-4'>Product Information</h2>
                    <p className='mb-2'><strong className='font-medium'>Product ID:</strong> {product.id}</p>
                    <p className='mb-2'><strong className='font-medium'>Product Name:</strong> {product.product_name}</p>
                    <p className='mb-2'><strong className='font-medium'>Dealer:</strong> {product.Product_dealer}</p>
                    {/* <p className='mb-2'><strong className='font-medium'>Product Availability:</strong> {product.Location_availability} </p> */}
                    <p className='mb-2 text-4xl'><strong className='font-medium'>Price:</strong> ₹ {product.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Product
