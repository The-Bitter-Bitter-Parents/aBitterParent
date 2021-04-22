import { useState } from "react";
import {Link} from 'react-router-dom';

const Form = () => {
  //  State to hold user input
  const [snacks, setSnacks] = useState("");
  //  Set user input when user types
  const handleChange = (e) => {
    setSnacks(e.target.value);
  };

  return (
    <div className="formContainer">
      <div className="formImg wrapper">
        <form>
          <label htmlFor="userInput">Search For A Snack</label>
          <input type="text" id="userInput" onChange={handleChange} placeholder='Search...' value={snacks}/>
          <Link to={`/results/${snacks}`} >
            <button type="submit" onClick={() => setSnacks('')}>Find Your Snack</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Form;
