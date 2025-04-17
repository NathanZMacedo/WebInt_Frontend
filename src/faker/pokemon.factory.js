import { base, faker } from "@faker-js/faker";

const pokemonAbilities = () => {
    return {
        ability: {
            name: faker.word.sample(),
            url: faker.internet.url(),
        },
        is_hidden: faker.datatype.boolean(),
        slot: 1,
    }
}

const pokemonTypes = () => {
    return {
        slot: faker.number.int(),
        type: {
            name: faker.word.sample(),
            url: faker.internet.url(),
        },
    }
}

export const pokemonFactory = () => {
    return {
        base_experience: faker.number.int({min: 50, max: 200 }),    // experiencia base do pokemon
        id: faker.number.int({min: 101, max: 1000 }),   // id do pokemon
        name: faker.word.sample(),  // nome do pokemon
        abilities: faker.helpers.multiple(pokemonAbilities, { count: 2 }),  // habilidades do pokemon
        sprites: {
            front_default: faker.internet.url(),   // url da imagem do pokemon
        },
        types: faker.helpers.multiple(pokemonTypes, { count: 2 }), // tipos do pokemon
        weight: faker.number.int({min: 1, max: 1000 }), // peso do pokemon
    }
}