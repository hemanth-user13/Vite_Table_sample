import { faker } from "@faker-js/faker";
import { useState } from "react";
import PropTypes from "prop-types"; 
import withToggles from "./HOC";
import Navbar from "./Header/Navbar";

// Generate product data
const products = Array.from({ length: 20 }, () => ({
  productName: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
}));
console.log(products);

// Generate company data
const Companies = Array.from({ length: 15 }, () => ({
  companyName: faker.company.name(),
  phrase: faker.company.catchPhrase(),
}));
console.log(Companies);

function ProductItem({ product }) {
  return (
    <div>
      <li className="product">
        <p>{product.productName}</p>
        <p>{product.price}</p>
        <p>{product.description}</p>
      </li>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisible] = useState(defaultVisibility);

  return (
    <li
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <p>{company.companyName}</p>
      {isVisible && (
        <p>
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

CompanyItem.propTypes = {
  company: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    phrase: PropTypes.string.isRequired,
  }).isRequired,
  defaultVisibility: PropTypes.bool,
};

CompanyItem.defaultProps = {
  defaultVisibility: false,
};

function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const displayItems = isCollapsed ? items.slice(0, 4) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={toggleOpen}>
        {isOpen ? <span>&or;</span> : <span>&and;</span>}
      </button>
      {isOpen && <ul>{displayItems.map(render)}</ul>}
      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `show all ${items.length}` : "show less"}
      </button>
    </div>
  );
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

function ProductList({ items }) {
  return (
    <ul>
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const ProductListWithToggles = withToggles(ProductList);

function Test24() {
  return (
    <>
      <div>
        <Navbar/>
        <List
          title="Companies"
          items={Companies}
          render={(company) => (
            <CompanyItem key={company.companyName} company={company} />
          )}
        />
      </div>
      <div className="">
        <ProductList items={products} />
        <ProductListWithToggles items={products} />
      </div>
    </>
  );
}

export default Test24;
