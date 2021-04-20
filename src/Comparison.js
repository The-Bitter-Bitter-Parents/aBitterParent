import Nutrition from './Nutrition';
import healthyArray from "./healthyArray.js";
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";
import firebase from './firebase';

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

    //  Make API call on component mount
    useEffect(() => {
        getComparison(choice, sugar);
    }, [])


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
          .then((result) => setterFunction(result.foods[0]))
          .catch((error) => console.log("error", error));
      };
      
      const getComparison = (userChoice, userSugar) => {
        // Filter through healthy array and only include snacks with 5g or less sugar than the choice
        const healthySnack = healthyArray.filter((item) => {
          return item.sugarContent <= userSugar - 5;
        });
        //  If there are snacks that fit the criteria pick a random healthy snack and display both otherwise display 'Good Choice'
        if (healthySnack[0]) {
          const randomSnack = Math.floor(Math.random() * healthySnack.length);
          getDetails(userChoice, setChoiceSnack);
          getDetails(healthySnack[randomSnack].snackName, setHealthySnack);
        } else {
          getDetails(userChoice, setChoiceSnack);
        }
      };
      //  Save pair of foods to firebase when user pushes save pair button
      const savePair = () => {
        const pair = {
          healthy: healthySnack.food_name,
          choice: choiceSnack.food_name,
        };
        const dbRef = firebase.database().ref();
        dbRef.push(pair);
      };

    return (
            <div className="comparison wrapper">
              <Nutrition snackItem={choiceSnack} heading="Your Choice" />
              {/* If there is a healthy snack, display it otherwise display good choice */}
              {healthySnack.food_name ? (
                <>
                  <Nutrition
                    snackItem={healthySnack}
                    heading="A Healthier Choice"
                  />
                  <button onClick={savePair}>Save This Pair</button>
                </>
              ) : (
                <div className="nutritionContainer">
                  <h3>A Healthier Choice</h3>
                  <div className="eatThat">
                    <h4>You made a great choice, go ahead and eat that!</h4>
                    {laugh}
                  </div>
                </div>
              )}
            </div>   
    )
}

export default Comparison;