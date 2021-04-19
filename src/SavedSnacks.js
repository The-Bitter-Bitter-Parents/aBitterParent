import firebase from "./firebase";
import { useEffect, useState } from "react";

const SavedSnacks = () => {
  const [savedPairs, setSavedPairs] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const newState = [];
      const data = response.val();
      console.log(data);

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
            <>
              <p>{pair.snacks.choice}</p>
              <p>and</p>
              <p>{pair.snacks.healthy}</p>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedSnacks;
