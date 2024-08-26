import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CounterContext = createContext();

function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <div>
      <CounterContext.Provider value={{ count, increase, decrease }}>
        <span>{children}</span>
      </CounterContext.Provider>
    </div>
  );
}

Counter.propTypes = {
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

// Assign subcomponents to the Counter component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
