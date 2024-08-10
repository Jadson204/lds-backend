const usuarioService = require("../../src/services/usuarioService");
const pool = require("../../src/config/database");

jest.mock("../../src/config/database");

describe("Usuario Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get a user by email", async () => {
    const email = "test@example.com";
    const mockUser = {
      username: "testuser",
      favoriteactivity: "coding",
      password: "password123",
    };

    pool.query.mockResolvedValue({ rows: [mockUser] });

    const result = await usuarioService.getUser(email);

    expect(result).toEqual(mockUser);

    expect(pool.query).toHaveBeenCalledTimes(1);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT username, favoriteactivity, password FROM users WHERE email = $1",
      [email]
    );
  });

  it("should throw an error if user is not found", async () => {
    const email = "nonexistent@example.com";

    pool.query.mockResolvedValue({ rows: [] });

    await expect(usuarioService.getUser(email)).rejects.toThrow(
      "Usuário não encontrado"
    );

    expect(pool.query).toHaveBeenCalledTimes(1);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT username, favoriteactivity, password FROM users WHERE email = $1",
      [email]
    );
  });

  it("should throw an error if there is a problem with the database", async () => {
    const email = "test@example.com";

    pool.query.mockRejectedValue(new Error("Erro de conexão"));

    await expect(usuarioService.getUser(email)).rejects.toThrow(
      "Erro ao buscar usuário por email: Erro de conexão"
    );

    expect(pool.query).toHaveBeenCalledTimes(1);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT username, favoriteactivity, password FROM users WHERE email = $1",
      [email]
    );
  });
});
