import axios from "axios";
 
export const UpdateComida = async({name,description,note,id}) => {
    const {data} = await axios.put(`http://localhost:4444/comidas/edit/${id}`, {
        name,
        description,
        note,
        id
    })
    return data
}