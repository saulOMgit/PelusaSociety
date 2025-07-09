import "./Btn.css";

export const Btn = () => {
  return (
    <button className="btn">
      <img src="../../../public/PawIcon.svg" alt="Icono de huella" className="btn__icon" />
      <div className="btn__label">¡Adopta!</div>
    </button>
  );
};

export default Btn;

