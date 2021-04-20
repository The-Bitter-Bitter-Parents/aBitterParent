import {Link} from 'react-router-dom';

const SavedButton = () => {
    return(
        <div className="savedPairButton">
            <Link to = "/SavedSnacks"><button>Show Saved Snacks</button></Link>
        </div>
    )
}


export default SavedButton