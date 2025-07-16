import React from 'react'
import './BtnSubmit'
import Modal from '../modal/Modal'

const BtnSubmit = () => {
  return (
    <>
    
    <div className="adopt-form__submit">
        <button type="submit" className="adopt-form__submit-btn">
            Enviar
        </button>
    </div>
    <div className="showModal">
        <Modal />
    </div>
    </>
  )
}

export default BtnSubmit