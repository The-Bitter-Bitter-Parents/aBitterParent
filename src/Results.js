const Results = ({ item }) => {
  return (
    <li>
      <h4>{item.name}</h4>
      <p>{item.sugar}g of sugar</p>
      <button>Select This Snack</button>
    </li>
  );
};

export default Results;
