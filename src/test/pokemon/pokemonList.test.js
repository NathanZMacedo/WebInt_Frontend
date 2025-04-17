import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PokemonList from "../../components/pokemon/pokemonList/PokemonList.jsx";

import axios from "axios";
import { pokemonsListMock } from "../../mock/pokemon.mock.js";
import { pokemon1 } from "../../mock/pokemon1.mock.js";

import { rest } from "msw";
import { setupServer } from "msw/node";
import preview from "jest-preview";

describe("PokemonList", () => {
    const pokemonIdChoosed = 1; // ID do Pokémon escolhido para o teste

    jest.mock("axios"); // Mock do axios para interceptar chamadas HTTP

    const server = setupServer(
        // Mock para listar Pokémons
        rest.get("http://localhost:4444/pokemons", (req, res, ctx) => {
            return res(ctx.json(pokemonsListMock));
        }),
        // Mock para detalhes de um Pokémon específico
        rest.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonIdChoosed}`, (req, res, ctx) => {
                const { id } = req.params; // Obtém o ID do Pokémon da requisição
                const pokemon = { ...pokemon1, id: parseInt(id) }; // Cria um Pokémon fictício com o ID escolhido
                return res(ctx.json(pokemon1)); // Retorna o Pokémon fictício como resposta
            }
        )
    );

    beforeAll(() => server.listen()); // Inicia o servidor antes de todos os testes

    afterEach(() => {
        server.resetHandlers(); // Reseta handlers para evitar conflitos entre testes
        jest.clearAllMocks(); // Limpa mocks para garantir isolamento dos testes
    });

    afterAll(() => server.close()); // Fecha o servidor após todos os testes

    test("Checando se a lista de pokemons está correta", async () => {
        axios.get.mockResolvedValueOnce({ data: pokemonsListMock }); // Mockando a requisição do axios para retornar a lista fictícia
        render(<PokemonList />); // Renderizando o componente de lista de Pokémons

        // Verificando se o texto "Loading..." aparece enquanto a lista é carregada
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Loading.../)).not.toBeInTheDocument(); // Verifica se o texto "Loading..." desaparece após o carregamento
            expect(screen.getByTestId(`pokemon-${pokemonGenerate.id}`)).toBeInTheDocument(); //Verifica se o Pokémon gerado está na lista
        });

        const pokemonList = screen.getByTestId("pokemon-list"); // Obtém o elemento da lista de Pokémons
        expect(pokemonList).toBeInTheDocument.toHaveLength(pokemonsToSee.results.length); // Verifica se a lista de Pokémons está no documento
    });

    test("Abre modal com detalhes do pokémon ao clicar", async () => {
        axios.get.mockResolvedValueOnce({ data: pokemonsListMock }); // Mockando a resposta inicial da lista de pokemons
        render(<PokemonList />); // Renderizando o componente de lista de Pokémons

        await waitFor(() => {
            expect(screen.getAllByTestId(`pokemon-${pokemonGenerated.id}`)).toBeInTheDocument(); // Verifica se a lista de Pokémons está no documento 
        })
        axios.get.mockResolvedValueOnce({ data: pokemonGenerated }); // Mockando a resposta da requisição de detalhes do Pokémon
        

       const pokemonElement = screen.getByTestId(`pokemon-${pokemonGenerated.id}`); // Obtém o elemento do Pokémon gerado
        await act(async () => {
            fireEvent.click(pokemonElement); // Simula o clique no Pokémon para abrir o modal
        })
        
        //Aguardando até que o modal seja aberto
        await awaitFor(() => {
            expect(screen.getByTestId("modal-pokemon")).toBeInTheDocument();
        })

        // Validando que o modal contém as informações corretas
        expect(screen.getByTestId(`pokemon-chosed-${pokemonGenerated.id}`)).toBeInTheDocument();
        expect(screen.getByText(pokemonGenerated.types[0].type.name)).toBeInTheDocument();
        expect(screen.getByText(pokemonGenerated.types[1].type.name)).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(screen.getByTestId("button-close-modal")); // Simula o clique no botão de fechar o modal
        })

        await awaitFor(() => {
            expect(screen.queryByTestId("modal-pokemon")).not.toBeInTheDocument(); // Verifica se o modal foi fechado
        })
    })
});
