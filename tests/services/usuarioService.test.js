const pool = require("../../src/config/database"); // Certifique-se de que este caminho está correto
const usuarioService = require("../../src/services/usuarioService");
const Chance = require("chance");
const chance = new Chance();

jest.mock("../../src/config/database");

describe("Usuario Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const user = {
      username: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      favoriteactivity: chance.word(),
    };
    pool.query.mockResolvedValue({ rows: [user] });

    const result = await usuarioService.createUser(user);
    expect(result).toEqual(user);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("should get a user by email", async () => {
    const user = {
      username: chance.name(),
      email: chance.email(),
      favoriteactivity: chance.word(),
      password: chance.string({ length: 8 }),
    };
    pool.query.mockResolvedValue({ rows: [user] });

    const result = await usuarioService.getUser(user.email);
    expect(result).toEqual(user);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("should delete a user", async () => {
    const email = chance.email();
    pool.query.mockResolvedValue({ rowCount: 1 });

    const result = await usuarioService.deleteUser(email);
    expect(result).toEqual({
      success: true,
      message: "Usuário deletado com sucesso",
    });
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("should update a user", async () => {
    const email = chance.email();
    const updatedData = { favoriteactivity: chance.word() };
    pool.query.mockResolvedValue({ rowCount: 1 });

    const result = await usuarioService.updateUser(email, updatedData);
    expect(result).toEqual({ message: "Usuário atualizado com sucesso" });
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});
