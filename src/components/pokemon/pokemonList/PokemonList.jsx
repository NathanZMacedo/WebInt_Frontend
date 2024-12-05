import axios from "axios"
import { UsePokemons } from "../../../hooks/Pokemons/UsePokemons"
import { useState } from "react"

const PokemonList = () => {
    const {loading, error, data:pokemons} = UsePokemons()
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message} </div>
    }

    const extractIdFromUrl = (url) => {
        const urlParts = url.split('/')
        return urlParts[urlParts.length - 1]
    }

    const fetchPokemonDetails = async (id) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            setSelectedPokemon(response.data)
            setModalVisible(true)
        } catch (error) {
            console.error("Erro ao buscar detalhes do Pokemon:", error)
        }
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>

                <tbody>
                    {pokemons.map((pokemon) => (
                        <tr 
                            key={pokemon.name}
                            onClick={() => fetchPokemonDetails(extractIdFromUrl(pokemon.url))}
                            style={{cursor: 'pointer'}}
                        >

                            <td> {extractIdFromUrl(pokemon.url)} </td>
                            <td> {pokemon.name} </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalVisible && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setModalVisible(false)}
                />
            )}


        </div>
    )
}