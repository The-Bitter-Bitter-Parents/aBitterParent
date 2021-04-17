const Results = ({ item, getDetails }) => {
  return (
    <li>
      <h4>{item.name}</h4>
      <p>{item.sugar}g of sugar</p>
      <button onClick={ () => {getDetails(item.name)}}>Select This Snack</button>
    </li>
  );
};

export default Results;
