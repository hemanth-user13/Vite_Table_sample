import Navbar from './Header/Navbar';
import { DataGrid } from '@mui/x-data-grid';
import Counter from './Counter';

function AddProducts() {
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns = [
    {
      field: 'col1',
      headerName: 'Column 1',
      width: 150
    },
    {
      field: 'col2',
      headerName: 'Column 2',
      width: 150
    },
  ];
  return (
    <div>
      <Navbar />
      <h2 className='text-3xl font-serif ml-40 py-3'>Welcome to add product page </h2>
      <DataGrid rows={rows} columns={columns} style={{marginLeft:"200px"}}/>
      <Counter>
      <Counter.Label>Test the Context Hook</Counter.Label>
      <Counter.Decrease icon="-"/>
      <Counter.Count/>
      <Counter.Increase icon="+"/>
      </Counter>
    </div>
  )
}

export default AddProducts
