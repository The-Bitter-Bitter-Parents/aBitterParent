import { useState } from "react";

const Form = ({ getSnacks }) => {
  const [snacks, setSnacks] = useState("");

  const handleChange = (e) => {
    setSnacks(e.target.value);
  };

  return (
    <div className="formContainer">
      <div className="formImg wrapper">
        <form onSubmit={(e) => getSnacks(e, snacks)}>
          <label htmlFor="userInput">Search For A Snack</label>
          <input type="text" id="userInput" onChange={handleChange} placeholder='Search...'/>
          <button type="submit">Find Your Snack</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
