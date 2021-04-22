import { useState, useEffect } from "react";
import firebase from "./firebase";
import Nutrition from "./Nutrition";

const SavedComparison = (props) => {
  const [healthySnack, setHealthySnack] = useState({});
  const [choiceSnack, setChoiceSnack] = useState({});

  const key = props.match.params.key;

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      setHealthySnack(response.val()[key].healthy);
      setChoiceSnack(response.val()[key].choice);
    });

    return () => {
      dbRef.off();
    };
  }, [key]);

  return (
    <div className="comparison wrapper">
      <h2>
        <span>{healthySnack.food_name}</span> has{" "}
        {(choiceSnack.nf_sugars - healthySnack.nf_sugars).toFixed(0)}g less
        sugar than <span>{choiceSnack.food_name}</span>
      </h2>

      <Nutrition snackItem={choiceSnack} heading="Your Choice" className="first" />

      <Nutrition snackItem={healthySnack} heading="A Healthier Choice" className="second" />
    </div>
  );
};

export default SavedComparison;
