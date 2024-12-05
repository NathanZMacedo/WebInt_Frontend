import axios from "axios";

export const deleteComida = async (id) => {
    const{data} = await axios.delete(`http://localhost:4444/comidas/delete/${id}`)
    return data;
}