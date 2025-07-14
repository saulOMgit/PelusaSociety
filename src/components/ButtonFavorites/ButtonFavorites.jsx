import { useNavigate } from 'react-router-dom'
import './ButtonFavorites.css'
import icon from '../../assets/fav.png'

const ButtonFavorites = () => {
  const navigate = useNavigate()
  return (

        <div className="buttonFavorites__container" onClick={() => navigate('/FavoritesPage')}>
            <img src={icon} alt="icono favoritos" className="icon"/>
            <button className="buttonFavorites">Favoritos</button>
        </div>
  )
}

export default ButtonFavorites