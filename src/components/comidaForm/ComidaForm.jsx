import React, { useEffect, useState } from 'react'
import "../form/Form.css"
function ComidaForm(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState(0);


    const CadastrarComida = (event) => {
        event.preventDefault();
        let id = undefined;
        if (props.editingComida) {
            id = props.editingComida.id;
        }
        props.createComida({ name, description, note, id })
        props.fecharoModal();
    };
    useEffect(() => {
        if (props.editingComida) {
            setName(props.editingComida.name)
            setDescription(props.editingComida.description)
            setNote(props.editingComida.note)
        }
    }, [props.editingComida]);
    return (
        <div className='formularioComida'>

            <form className='form' onSubmit={CadastrarComida}>

                <h1>{props.editingComida ? "Editar" : "Cadastrar"} Comida</h1>
                <label htmlFor="name">Nome</label>
                <input type="text"
                    placeholder="name"
                    name='name' id='name'
                    onChange={(e) => setNome(e.target.value)}
                    value={name}
                />

                <label htmlFor="description">Descrição</label>
                <input name="description"
                    placeholder="description"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <label htmlFor="note">Nota</label>
                <input name="note"
                    placeholder="note"
                    id="note"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                />

                <button type="submit">
                    {props.editingComida? "Editar": "Cadastrar"}
                </button>
            </form>
        </div>
    )
}

export default ComidaForm