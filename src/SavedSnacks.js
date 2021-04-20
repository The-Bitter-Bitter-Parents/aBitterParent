import firebase from "./firebase";
import { useEffect, useState } from "react";

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
  }, []);

  return (
    <div className="snackPairs wrapper">
      <ul>
        {savedPairs.map((pair) => {
          return (
            <li key={pair.key}>
              <h4>{pair.snacks.choice}</h4>
              <h5>and</h5>
              <h4>{pair.snacks.healthy}</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedSnacks;
