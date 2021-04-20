import "./App.css";
import Header from "./Header";
import Form from "./Form.js";
import ResultsContainer from './ResultsContainer';
import Comparison from './Comparison';
import Footer from "./Footer";
import {
  Route, 
  BrowserRouter as Router
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
        <Route path='/results/:query' render={() => <ResultsContainer />} />
        {/* Show comparison when user selects a snack */}
        <Route path='/comparison/:choice/:sugar' component={Comparison}/>
        
        <button>Show Saved Pairs</button>
        <SavedSnacks />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
