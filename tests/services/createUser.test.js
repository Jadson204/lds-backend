const usuarioService = require("../../src/services/usuarioService");
const pool = require("../../src/config/database");

jest.mock("../../src/config/database");

describe("createUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      favoriteactivity: "coding",
    };
    pool.query.mockResolvedValueOnce({ rows: [newUser] });

    const result = await usuarioService.createUser(newUser);

    expect(result).toEqual(newUser);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO users (username, email, password, favoriteActivity) VALUES($1, $2, $3, $4)",
      [
        newUser.username,
        newUser.email,
        newUser.password,
        newUser.favoriteactivity,
      ]
    );
  });

  it("should throw an error if there is a database error", async () => {
    // Mock para simular erro no banco de dados
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      favoriteactivity: "coding",
    };
    pool.query.mockRejectedValueOnce(new Error("Database error"));

    await expect(usuarioService.createUser(newUser)).rejects.toThrow(
      "Erro ao cadastrar usuário: Error: Database error"
    ); // Ajustado para corresponder à mensagem real do erro
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO users (username, email, password, favoriteActivity) VALUES($1, $2, $3, $4)",
      [
        newUser.username,
        newUser.email,
        newUser.password,
        newUser.favoriteactivity,
      ]
    );
  });
});
