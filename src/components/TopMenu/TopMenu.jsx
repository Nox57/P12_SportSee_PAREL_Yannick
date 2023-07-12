import './TopMenu.css'
import Logo from '../../assets/logo.svg'

function TopMenu() {
    return (
        <div className="topmenu">
            <div className="topmenu--logo">
                <img src={Logo} alt="SportSee" />
            </div>
            <div className="topmenu--navlinks">
                <a href="/">Accueil</a>
                <a href="/">Profil</a>
                <a href="/">Réglages</a>
                <a href="/">Communauté</a>
            </div>
        </div>
    )
}

export default TopMenu
