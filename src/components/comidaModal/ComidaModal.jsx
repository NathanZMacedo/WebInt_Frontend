import React from 'react'
import '../modal/Modal.css';
import { AiFillCloseCircle } from "react-icons/ai";
import ComidaForm from '../comidaForm/ComidaForm.jsx';

function ComidaModal(props) {
    return (    
        <div className='fundo'>
            <div className='closeModal'  onClick={props.fecharOModal}>
                <AiFillCloseCircle size={40} color="white" />
            </div>
            <div>
                <ComidaForm {...props} />
            </div>
        </div > 
    );
}
export default ComidaModal;