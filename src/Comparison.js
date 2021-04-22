import Nutrition from "./Nutrition";
import healthyArray from "./healthyArray.js";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";
import firebase from "./firebase";

const Comparison = (props) => {
  //  Laugh Icon
  const laugh = (
    <FontAwesomeIcon
      icon={faLaughBeam}
      size="6x"
      color="#ffb454"
      aria-hidden="false"
    />
  );
  //  Name of chosen snack
  const choice = props.match.params.choice;
  //  Sugar content of chosen snack
  const sugar = props.match.params.sugar;

  // Stateful variables for hold API results for each snack
  const [choiceSnack, setChoiceSnack] = useState({});
  const [healthySnack, setHealthySnack] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Save This Pair');

  const getDetails = (query, setterFunction) => {
    // API Call
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "2622ee6b");
    myHeaders.append("x-app-key", "75455fad3c73f5adcd4ef59351c53dcd");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("query", query);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      requestOptions
    )
      .then((response) => response.json())
      //  Set state to API results
      .then((result) => {
        setterFunction(result.foods[0]);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  //  Save pair of foods to firebase when user pushes save pair button
  const savePair = () => {
    const pair = {
      healthy: healthySnack,
      choice: choiceSnack,
    };
    const dbRef = firebase.database().ref();
    dbRef.push(pair);
    setIsDisabled(true);
    setButtonText('Saved');
  };

   //  Make API call on component mount
  // Filter through healthy array and only include snacks with 5g or less sugar than the choice
  useEffect(() => {
    const healthySnack = healthyArray.filter((item) => {
      return item.sugarContent <= sugar - 5;
    });
    //  If there are snacks that fit the criteria pick a random healthy snack and display both otherwise display 'Good Choice'
    if (healthySnack[0]) {
      const randomSnack = Math.floor(Math.random() * healthySnack.length);
      getDetails(choice, setChoiceSnack);
      getDetails(healthySnack[randomSnack].snackName, setHealthySnack);
    } else {
      getDetails(choice, setChoiceSnack);
    }
  }, [choice, sugar]);

  return (
    <div className="comparison wrapper">
      {/* Ternary to show loading state while api call is running */}
      {!isLoading ? (
        <>
          <h2 className="comparisonTitle">
            <span>{healthySnack.food_name}</span> has{" "}
            {(choiceSnack.nf_sugars - healthySnack.nf_sugars).toFixed(0)}g less
            sugar than <span>{choiceSnack.food_name}</span>
          </h2>
          <Nutrition snackItem={choiceSnack} heading="Your Choice" />
          {/* Ternary to display good match when there are not less sugary snacks */}
          {healthySnack.food_name ? (
            <>
              <Nutrition
                snackItem={healthySnack}
                heading="A Healthier Choice"
              />
              <button onClick={savePair} disabled={isDisabled}>{buttonText}</button>
            </>
          ) : (
            <div className="nutritionContainer">
              <h2>A Healthier Choice</h2>
              <div className="eatThat">
                <h4>You made a great choice, go ahead and eat that!</h4>
                {laugh}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Comparison;
