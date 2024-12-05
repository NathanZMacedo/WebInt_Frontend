import { GetComida } from '../../hooks/ComidaCRUD/GetComida'
import { UpdateComida } from '../../hooks/ComidaCRUD/UpdateComida'
import { createProduct } from '../../hooks/ComidaCRUD/CreateComida'
import { deleteComida } from '../../hooks/ComidaCRUD/DeleteComida'
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import AddButton from '../../components/ui/addButton/Addbutton';
import ComidaList from '../../components/comidaList/ComidaList';
import ComidaModal from '../../components/comidaModal/ComidaModal';

function ComidaPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [comida, setComida] = useState([]);
    const [editingComida, setEditingComida] = useState(null);

    const handleOpen = () => {
        setIsOpen((state) => !state)
    }

    useEffect(() => {
        GetComida().then((response) => setComida(response));
    })

    return (
        < div >
            <AddButton abrirOModal={handleOpen} texto="Adicionar uma Comida" />

            <ComidaList
                comidas={comida}
                setEditMode={(comida) => {
                    setEditingComida(comida);
                    handleOpen();
                }}
                deleteComida={(id) => deleteComida(id)}
            />

            {/* Checando se o modal está aberto */}

            {isOpen && (
                <ComidaModal
                    createComida={async (comida) => {
                        if (comida.id) {
                            const response = await UpdateComida(comida);
                            setComida((prevState) =>
                                prevState.map((oldComida) =>
                                    oldComida.id === comida.id ? response : oldComida))
                        } else {
                            const res = await createProduct(comida)
                            setComida((prevState) => [...prevState, res])
                        }
                        setEditingComida(null)
                    }}
                    editingComida={editingComida}
                    fecharOModal={() => {
                        handleOpen()
                        setEditingComida();
                    }}
                />
            )}
        </div>
    )
}

export default ComidaPage