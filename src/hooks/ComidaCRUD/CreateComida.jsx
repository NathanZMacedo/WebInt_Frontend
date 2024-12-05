import axios from "axios";

export const createProduct = async ({name, description, note}) => {
    const {data} = await axios.post("http://localhost:4444/comidas/create", {
            name,
            description,
            note
        })
    return data;
}