import firebase from "./firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SavedSnacks = () => {
  const [savedPairs, setSavedPairs] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const newState = [];
      const data = response.val();

      for (let key in data) {
        newState.push({
          key: key,
          snacks: data[key],
        });
      }
      setSavedPairs(newState);
    });
    return () => {
      dbRef.off();
    };
  }, []);

  const deletePair = (key) => {
    const dbRef = firebase.database().ref();
    dbRef.child(key).remove();
  };

  return (
    <div className="snackPairs wrapper">
      <ul>
        {savedPairs.map((pair) => {
          return (
            <li key={pair.key}>
              <h4>{pair.snacks.choice.food_name}</h4>
              <h5>and</h5>
              <h4>{pair.snacks.healthy.food_name}</h4>
              <Link to={`/savedComparison/${pair.key}`}>
                <button>View Nutrition Info</button>
              </Link>
              <div className="deleteButtonContainer">
                <button
                  className="deleteButton"
                  onClick={() => deletePair(pair.key)}
                >
                  x
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedSnacks;
