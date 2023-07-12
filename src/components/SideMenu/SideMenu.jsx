import './SideMenu.css'
import Yoga from '../../assets/yoga.svg'
import Natation from '../../assets/natation.svg'
import Velo from '../../assets/velo.svg'
import Muscu from '../../assets/muscu.svg'

function SideMenu() {
    return (
        <div className="sidemenu">
            <div className="sidemenu--icons">
                <img src={Yoga} alt="Yoga" width="64px" height="64px" />
                <img src={Natation} alt="Natation" width="64px" height="64px" />
                <img src={Velo} alt="Velo" width="64px" height="64px" />
                <img src={Muscu} alt="Muscu" width="64px" height="64px" />
            </div>
            <div className="sidemenu--copyright">Copyright SportSee 2023</div>
        </div>
    )
}

export default SideMenu
