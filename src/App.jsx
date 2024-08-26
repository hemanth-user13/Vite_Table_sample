import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import MainPage from './Components/Mainpage';
import ProductPage from './Components/Product';
import { ProductProvider } from './Components/ProductSlice';
import UserPage from './Components/Users';
import AddProducts from './Components/AddProducts';
// import Demo from './Demo';
import Faker from './Components/test24';
import PageNotFound from './Components/Error/Error';
import HOC1 from './Components/HOC1';
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const CounterContext = createContext();

function App({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <div>
      <CounterContext.Provider value={{ count, increase, decrease }}>
        <span>{children}</span>
        <Router>
          <ProductProvider>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/ProductList' element={<Main />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/users' element={<UserPage />} />
              <Route path='/addproducts' element={<AddProducts />} />
              <Route path='/demo' element={<Faker />} />
              <Route path='/hoc1' element={<HOC1 />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ProductProvider>
        </Router>
      </CounterContext.Provider>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

function Label({ children }) {
  return <span>{children}</span>;
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}

Increase.propTypes = {
  icon: PropTypes.node, // Ensures that icon is a valid React node
};

function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

Decrease.propTypes = {
  icon: PropTypes.node, // Ensures that icon is a valid React node
};

App.Count = Count;
App.Label = Label;
App.Increase = Increase;
App.Decrease = Decrease;

export default App;
