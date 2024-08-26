import Counter from './Counter';
import Navbar from './Header/Navbar';

function HOC1() {
  return (
    <div>
      <Navbar/>
      <h1>Compound Component Pattern</h1>
      <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="Test the HOC"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      />

      <Counter>
        <Counter.Label>Test the functionality</Counter.Label>
        <Counter.Decrease icon="-" />
        <Counter.Count />
        <Counter.Increase icon="+" />
      </Counter>
    </div>
  );
}

export default HOC1;
