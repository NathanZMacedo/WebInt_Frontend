import { faker } from '@faker-js/faker';

export default function createRandomUser() {
    //criando um usuário aleatório
    // o faker gera dados aleatorios para o usuário
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registredAt: faker.date.past(),
    }
}
// criando 5 usuários aleatórios
export const users = faker.helpers.multiple( createRandomUser, { count: 5 });

