import React from 'react';
import "./ComidaCard.css";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
function ComidaCard({ comida, setEditMode, deleteComida }) {
    const { name, description, note, id } = comida;
    return (
        <div id='card' className="comida-card">
            <h1>{name}</h1>
            <div>{description} Descrição</div>
            <div>{note} Nota</div>
            <div id='icons'>
                <AiTwotoneEdit
                    color="yellow"
                    width={32}
                    onClick={() => setEditMode(comida)}
                />
                <AiFillDelete
                    color="red"
                    width={32}
                    onClick={() => deleteComida(id)} />
            </div>
        </div>
    )
};

export default ComidaCard;