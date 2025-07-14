import "./Btn.css";
import PawIcon from '../../assets/PawIcon.svg'; 
export const Btn = ({ onClick, petData }) => {

   const handleClick = () => {
    if (onClick) {
      onClick(petData); // Pasa los datos de la mascota al manejador de eventos
    }
  };

  return (
    <button className="btn" onClick={handleClick}>
      <img src={PawIcon} alt="Icono de huella" className="btn__icon" />
      <div className="btn__label">¡Adopta!</div>
    </button>
  );
};

export default Btn;

