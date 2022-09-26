import "../../assets/scss/style.scss";
import Subheader from "./SubHeader/Subheader";


function Header() {

    return (
        <>
            <header>
                <div className="headline">
                    <h1>Food Florist Helsingborg</h1>
                    <h5 className="slide-title animate__animated animate__slideInLeft">Bouquets made with love and specially selected ingredients.</h5>
                </div>
            </header>
            <Subheader/>
        </>
    )

}

export default Header;