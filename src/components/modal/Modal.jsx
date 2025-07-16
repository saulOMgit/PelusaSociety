import { useEffect } from 'react'
import './Modal.css'

const Modal = ( { open, onClose }) => {
    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [open, onClose]);

    if (!open) return null;


  return (
    <div className="modal__overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__title">
            <h3>¡Has completado tu solicitud!</h3>
        </div>
        <div className="modal__text">
            <p>Ahora nuestros expertos la estudiarán y en breves nos podremos en contacto contigo para darte la respuesta final ✨ </p>
        </div>
        </div>
    </div>
  )
}

export default Modal