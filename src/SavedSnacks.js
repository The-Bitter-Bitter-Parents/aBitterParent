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
    <div>
      <ul>
        {savedPairs.map((pair) => {
          return (
            <div key={pair.key}>
              <p>{pair.snacks.choice}</p>
              <p>and</p>
              <p>{pair.snacks.healthy}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedSnacks;
