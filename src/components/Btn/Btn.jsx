import './Btn.css';

export const Btn = () => {
  return (
    <button
      className="btn"
      type="button"
      aria-label="Adoptar mascota"
    >
      <span className="btn-content">
        <span className="btn-text">
          ADÓPTAME
        </span>
      </span>
    </button>
  );
};
