const Results = ({ item, getComparison }) => {
  return (
    <li>
      <h4>{item.name}</h4>
      <p>{item.sugar}g of sugar</p>
      <button onClick={ () => {getComparison(item.name, item.sugar)}}>Select This Snack</button>
    </li>
  );
};

export default Results;
