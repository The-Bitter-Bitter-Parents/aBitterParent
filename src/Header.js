import carrot from './assets/carrot-solid.svg'
import peaches from './assets/peach-granola.jpg'

const Header = () => {
    return (
        <header>
            <div className="titleBar wrapper">
                <div className="logo">
                    <img src={carrot} alt="carrot logo"/>
                    <h1>A Smarter Snack</h1>
                </div>
                <div className="nutritionix">
                    <a href='https://www.nutritionix.com/'>Powered by Nutritionix</a>
                </div>
            </div>
            <img className='headerImg' src={peaches} alt="Bowls of Peaches and Granola with Yogurt."/>
            <div className="description">
                <p>Keep snack time healthy with our suggestions to replace those sweet treats!</p>
            </div>
        </header>
    )
}

export default Header
