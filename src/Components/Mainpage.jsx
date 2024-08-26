import NavBar from './Header/Navbar'

function Mainpage() {
  return (
    <div>
        <NavBar/>
        
      
       
      <div className="">
      {/* <header className="bg-orange-600 text-white py-4 px-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header> */}
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <main className="mt-6 ml-64">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <p className="text-gray-700 mb-4">
              View and manage users of the application.
            </p>
            
              Go to User Management
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">View Reports</h2>
            <p className="text-gray-700 mb-4">
              Access various reports and analytics.
            </p>
           
              View Reports
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-700 mb-4">
              Configure application settings.
            </p>
           
              Go to Settings
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resturants</h2>
            <p className="text-gray-700 mb-4">Add the Resturants</p>
              ADD RESTURANTS
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">View Resturants</h2>
            <p className="text-gray-700 mb-4">
              Till the Resturant count is 100
            </p>
              Check the Resturants  
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

export default Mainpage
