import React from 'react'
import ComidaCard from '../comidaCards/ComidaCard.jsx'

function ComidaList({ comidas, setEditMode, deleteComida }) {
    return (
        <div id='comida-list'>
            {comidas.map((comida) => (
                <ComidaCard
                    comida={comida}
                    key={comida.id}
                    setEditMode={setEditMode}
                    deleteComida={deleteComida}
                />
            ))}

        </div>
    )
}
export default ComidaList