
import './App.css';

function App() {

const getSnacks = () => {
const myHeaders = new Headers();
myHeaders.append("x-app-id", "df445c8d");
myHeaders.append("x-app-key", "aafcc21abbff4ba8ef87b9892cb2d5a9");


const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://trackapi.nutritionix.com/v2/search/instant?query=butter cookies&detailed=true", requestOptions)
  .then(response => response.json())
  .then(result => {
      const snacks = result.branded
      console.log(snacks)
      snacks.map(snack => {
          const nutrientList = snack.full_nutrients
          const snackName = snack.food_name
          const snackImg = snack.photo.thumb
          const sugarContent = nutrientList.filter(nutrient => nutrient.attr_id === 269)
          console.log(snackName, snackImg, sugarContent[0].value)
          return snackName;
      })
  })
  .catch(error => console.log('error', error));
  }

  return (
    <div>
      <h1>A Bitter Parent</h1>
      <button onClick={getSnacks}>Click Me</button>
    </div>
  );
}

export default App;
