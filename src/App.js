import "./App.css";
import Form from "./Form.js";
import Results from "./Results.js";
import { useState } from "react";

function App() {
  const [snackResults, setSnackResults] = useState([]);

  const getSnacks = (e, query) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "df445c8d");
    myHeaders.append("x-app-key", "aafcc21abbff4ba8ef87b9892cb2d5a9");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${query}&detailed=true`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const snacks = result.common;
        // console.log(snacks);

        const snacksArray = snacks.map((snack) => {
          const nutrientList = snack.full_nutrients;
          const snackName = snack.food_name;
          const snackImg = snack.photo.thumb;
          const sugarContent = nutrientList.filter(
            (nutrient) => nutrient.attr_id === 269
          );
          // console.log(snackName, snackImg, sugarContent);
          if (sugarContent[0] !== undefined) {
            return {
              name: snackName,
              image: snackImg,
              sugar: sugarContent[0].value.toFixed(1),
            };
          } else {
            return {
              name: snackName,
              image: snackImg,
              sugar: 0,
            };
          }
        });
        setSnackResults(snacksArray);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <h1>A Bitter Parent</h1>
      <Form getSnacks={getSnacks} />
      {/* <Results /> */}
      <div className="resultsContainer">
        <ul>
          {snackResults.map((item) => {
            return <Results item={item} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
