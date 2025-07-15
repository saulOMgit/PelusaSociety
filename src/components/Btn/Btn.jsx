import "./Btn.css";
import PawIcon from '../../assets/PawIcon.svg';
import { useNavigate } from 'react-router-dom';

export const Btn = ({ petData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/adopt', { state: { petData } }); // Redirige a AdoptPage con los datos de la mascota
  };

  return (
    <button className="btn" onClick={handleClick}>
      <img src={PawIcon} alt="Icono de huella" className="btn__icon" />
      <div className="btn__label">¡Adopta!</div>
    </button>
  );
};

export default Btn;

