const faker = require('faker');
const { createUser } = require('../../src/services/usuarioService');

describe('Teste de criação de usuário', () => {
    it('Deve criar um novo usuário', async () => {
        // Gera dados fictícios de um novo usuário
        const userData = {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            favoriteactivity: faker.internet.favoriteactivity()
        };

        // Criar um novo usuário usando o serviço createUser
        const newUser = await usuarioService.createUser(userData);

        // Verificar se o usuário foi criado com sucesso
        expect(newUser).toBeDefined();
        expect(newUser.username).toEqual(userData.username);
        expect(newUser.email).toEqual(userData.email);
        expect(newUser.email).toEqual(userData.email);
        expect(newUser.favoriteactivity).toEqual(userData.favoriteactivity);

        // Verificar se o usuário pode ser encontrado no banco de dados
        const foundUser = await getUser(userData.email);
        expect(foundUser).toBeDefined();
        expect(foundUser.username).toEqual(userData.username);
        expect(foundUser.email).toEqual(userData.email);
        expect(foundUser.favoriteactivity).toEqual(userData.favoriteactivity);
    });
});