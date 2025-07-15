import { useNavigate } from 'react-router-dom'
import './ButtonFavorites.css'
import iconLight from '../../assets/favDark.png'
import iconDark from '../../assets/fLight.png'

const ButtonFavorites = ({ theme }) => {
  const navigate = useNavigate()
  
  return (

        <div className="buttonFavorites__container" onClick={() => navigate('/favoritos')}>
            <img src={theme === 'light' ? iconLight : iconDark} alt="icono favoritos" className="icon"/>
            <button className="buttonFavorites">Favoritos</button>
        </div>
        
  )
}

export default ButtonFavorites