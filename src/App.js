import "./App.css";
import Header from "./Header";
import Form from "./Form.js";
import ResultsContainer from './ResultsContainer';
import Comparison from './Comparison';
import SavedButton from './SavedButton.js'
import SavedComparison from './SavedComparison'
import Footer from "./Footer";
import {
  Route, 
  BrowserRouter as Router,
} from 'react-router-dom'
import SavedSnacks from "./SavedSnacks";
import { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";


function App() {

  const topRef = useRef()
  const scrollToTop = () => {
    topRef.current.scrollIntoView({behavior: 'smooth'})
  };

  const chevronUp = (
    <FontAwesomeIcon
      icon={faChevronUp}
      size="1x"
      color="#000"
      aria-hidden="false"
    />
  );

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div ref={topRef}>
        <Header />
        <Form />
        {/* Show results when user does a search */}
        <Route path='/results/:query' component={ResultsContainer} />
        {/* Show comparison when user selects a snack */}
        <Route path='/comparison/:choice/:sugar' component={Comparison}/>
        {/* <Link to = "/SavedSnacks"><button>Show Saved Pairs</button></Link> */}
        <Route path='/savedComparison/:key' component={SavedComparison} />
        <Route exact path={['/', '/results/:query', '/comparison/:choice/:sugar', '/savedComparison/:key']} component={SavedButton} />
        <Route path='/SavedSnacks' component={SavedSnacks} />
        <button className="toTopButton" onClick={scrollToTop}>{chevronUp}</button>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
