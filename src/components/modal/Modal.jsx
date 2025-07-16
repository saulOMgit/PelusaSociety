import React from 'react'
import './Modal.css'


const Modal = () => {
  return (
    <div className="modal">
        <div className="modal__tilte">
            <h3>¡Has completado tu solicitud 🥳!</h3>
        </div>
        <div className="modal__text">
            <p>Ahora nuestros expertos la estudiarán y en breves nos podremos en contacto contigo para darte la respuesta final ✨ </p>
        </div>
    </div>
  )
}

export default Modal