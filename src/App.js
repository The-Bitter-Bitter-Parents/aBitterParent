import "./App.css";
import Header from "./Header";
import Form from "./Form.js";
import ResultsContainer from './ResultsContainer';
import Comparison from './Comparison';
import SavedButton from './SavedButton.js'
import Footer from "./Footer";
import {
  Route, 
  BrowserRouter as Router,
  Link
} 
from 'react-router-dom'
import SavedSnacks from "./SavedSnacks";

function App() {
  
  return (
    <Router>
      <div>
        <Header />
        <Form />
        {/* Show results when user does a search */}
        <Route path='/results/:query' component={ResultsContainer} />
        {/* Show comparison when user selects a snack */}
        <Route path='/comparison/:choice/:sugar' component={Comparison}/>
        {/* <Link to = "/SavedSnacks"><button>Show Saved Pairs</button></Link> */}
        <Route exact path={['/', '/results/:query', '/comparison/:choice/:sugar']} component={SavedButton} />
        <Route path='/SavedSnacks' component={SavedSnacks} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
