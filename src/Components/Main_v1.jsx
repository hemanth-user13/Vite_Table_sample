// import { useEffect, useState } from 'react';
// import NavBar from './Header/Navbar';
// import { useProductProvider } from './ProductSlice';
// import axios from 'axios';
// import { TrashIcon } from '@heroicons/react/24/solid';
// import { PencilIcon } from '@heroicons/react/24/solid';
// import Swal from 'sweetalert2';
// import {Link} from 'react-router-dom';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import Modal from './modal/modal'



 

// function SearchBar() {
//     const { searchTerm, setSearchTerm } = useProductProvider();
    

//     return (
//         <div className="max-w-md ml-36">
//             <input
//                 type="search"
//                 className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//         </div>
//     );
// }


//  function Main() {
//     const {data,setData,searchTerm }=useProductProvider();
//     const [selectedItems, setSelectedItems]=useState(new Set());
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalData, setModalData] = useState(null);

//     const FetchData=async()=>{
//         const DATA_URL="http://localhost:8000/products"
//         try {
//             const response=await axios.get(DATA_URL)
//             console.log(response.data)
//             setData(response.data)
//         } catch (error) {
//             console.log("there is an error in the api call",error)
            
//         }
//     }

//     const handleSelectAll = (e) => {
//         if (e.target.checked) {
//             setSelectedItems(new Set(filteredData.map(item => item.id)));
//         } else {
//             setSelectedItems(new Set());
//         }
//     };

//     const handleRowCheckboxChange = (id) => {
//         setSelectedItems(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(id)) {
//                 newSet.delete(id);
//             } else {
//                 newSet.add(id);
//             }
//             return newSet;
//         });
//     };

//     const deleteSelectedProducts = () => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'You won’t be able to revert this!',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 const newData = data.filter(item => !selectedItems.has(item.id));
//                 setData(newData);
//                 setSelectedItems(new Set());
//                 Swal.fire('Deleted!', 'Selected products have been deleted.', 'success');
//             }
//         });
//     };

//     const deleteProduct = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'You won’t be able to revert this!',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 setData(data.filter(item => item.id !== id));
//                 Swal.fire('Deleted!', 'Product has been deleted.', 'success');
//             }
//         });
//     };

//     useEffect(()=>{
//         FetchData()
//     },[])

   

//     const filteredData=data.filter(item=>
//         item.product_name.toLowerCase().includes(searchTerm.toLowerCase())||
//         item.Product_dealer.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     const DealerSplit=filteredData.map((item)=>(
//         item.Location_availability
//     ))
    
//     console.log("the dealers data is",DealerSplit)
//     const SplitResult=DealerSplit.slice(0,1)+',';
//     console.log(SplitResult)


//     const handleEditClick = (product) => {
//         setModalData(product);
//         setIsModalOpen(true);
//     };

//     const handleSave = (newProduct) => {
//         if (modalData) {
//             // Edit mode
//             setData(prevData =>
//                 prevData.map(item =>
//                     item.id === modalData.id
//                         ? { ...item, ...newProduct }
//                         : item
//                 )
//             );
//         } else {
//             // Add mode
//             setData([...data, { id: Date.now(), ...newProduct }]);
//         }
//         setIsModalOpen(false);
//     };

//    return (
//      <div>
//         <NavBar/>
//         <h1 className='text-4xl text-center my-3 pb-8 ml-48 font-serif'>Product Management</h1>
//         <SearchBar/>
//         <div className='flex justify-end items-end gap-10 absolute left-3/4 bottom-3/4 ml-14'>
//                 <button
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
//                     onClick={deleteSelectedProducts}
//                     disabled={selectedItems.size === 0}
//                 >
//                     Delete Selected
//                 </button>
//                 <EditData />
//             </div>
//         <div className='ml-36 my-7'>
//                 {filteredData.length > 0 ? (
//                     <table className="min-w-full bg-white border">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     <input
//                                         type="checkbox"
//                                         onChange={handleSelectAll}
//                                     />
//                                 </th>
//                                 <th className="px-9 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
//                                 <th className="px-8 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
//                                 <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Product Price</th>
//                                 <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Product Dealer</th>
//                                 <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase text-center tracking-wider">Product Locations</th>
//                                 <th className="py-3 text-base font-medium text-gray-500 uppercase tracking-wider" colSpan="2">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredData.map((item, index) => (
//                                 <tr key={index} className="bg-white border-b">
//                                     <td className='px-6 py-4 whitespace-nowrap'>
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedItems.has(item.id)}
//                                             onChange={() => handleRowCheckboxChange(item.id)}
//                                         />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <Link to={`/product/${item.id}`} state={{ product: item }}>
//                                             {item.product_name}
//                                         </Link>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.product_price}    </td>
//                                     {/* <td className="px-6 py-4 whitespace-nowrap">{item.product_price}</td> */}
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.Product_dealer}</td>
//                                     {/* {SplitResult.map((item,index)=>(
//                                         <div key={index}>
//                                              <td className="px-6 py-4 whitespace-nowrap" >{item}</td>
//                                         </div>
                                       
//                                     ))} */}
//                                     <td className="px-6 py-4 whitespace-nowrap">{SplitResult}</td>
                                    
//                                     <td className="">
//                                         <button

//                                             className="flex items-center text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
//                                         >
//                                             <PencilIcon className="w-5 h-5 mr-2" /> 
//                                             Edit
//                                         </button>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap flex gap-4">
//                                         <button
//                                             onClick={() => deleteProduct(item.id)}
//                                             className="flex items-center text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5"
//                                         >
//                                             <TrashIcon className="w-5 h-5 mr-2" /> 
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="text-center text-red-800 text-2xl">No Data Found</p>
//                 )}
//             </div>
//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSave={handleSave}
//                 initialData={modalData}
//             />
//      </div>
//    )
   
//  }
//  function EditData() {
//     const { setData } = useProductProvider();

//     const handleEditClick = async () => {
//         const { value: formValues, isConfirmed } = await Swal.fire({
//             title: 'Add Product Details',
//             html: `
//                 <input id="product-name" class="swal2-input" placeholder="Product Name" style="padding-right: 120px" required >
//                 <input id="product-brand" class="swal2-input" placeholder="Product Brand" style="padding-right:120px" required>
//                 <input id="product-price" class="swal2-input" placeholder="Product Price" style="padding-right:120px" required>
//                 <select id="category" class="swal2-select" style="padding-right:120px">
//                     <option value="" disabled selected>Select Category</option>
//                     <option value="amazon">Amazon</option>
//                     <option value="flipkart">Flipkart</option>
//                     <option value="cellbay">Cellbay</option>
//                     <option value="snapStore">Snap Store</option>
//                 </select>
//             `,
//             focusConfirm: false,
//             showCancelButton: true,
//             preConfirm: () => {
//                 const productName = document.getElementById('product-name').value.trim();
//                 const productBrand = document.getElementById('product-brand').value.trim();
//                 const productPrice = document.getElementById('product-price').value.trim();
//                 const category = document.getElementById('category').value;

//                 if (!productName || !productBrand || !productPrice || !category) {
//                     Swal.showValidationMessage('Please fill out all fields.');
//                     return false;
//                 }

//                 return {
//                     productName,
//                     productBrand,
//                     productPrice,
//                     category
//                 };
//             }
//         });

//         if (isConfirmed && formValues) {
//             const { productName, productBrand, productPrice, category } = formValues;
//             const newProduct = {
//                 id: Date.now(),
//                 product_name: productName,
//                 brand: productBrand,
//                 price: productPrice,
//                 category: category
//             };
//             setData(prevData => [...prevData, newProduct]);
//             Swal.fire('Success', 'Product details have been added.', 'success');
//         }
//     };

//     return (
//         <button
//         type="button"
//         className="flex items-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
//         onClick={handleEditClick}
//       >
//         <PlusIcon className="w-5 h-5 mr-2" /> 
//         Add Items
//       </button>
//     );
    
// }
 
//  export default Main
 