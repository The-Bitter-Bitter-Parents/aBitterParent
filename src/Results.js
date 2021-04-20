import {Link} from 'react-router-dom';

const Results = ({ item}) => {
  return (
    <li>
      <h4>{item.name}</h4>
      <p>{item.sugar}g of sugar</p>
      <Link to={`/comparison/${item.name}/${item.sugar}`}>
        <button>Select This Snack</button>
      </Link>
    </li>
  );
};

export default Results;
