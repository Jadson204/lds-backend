const usuarioService = require("../../src/services/usuarioService");
const pool = require("../../src/config/database");

jest.mock("../../src/config/database");

describe("Usuario Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a user", async () => {
    const userEmail = "test@example.com";
    const updatedUserData = {
      username: "newTestUser",
      favoriteactivity: "newCoding",
    };

    pool.query.mockResolvedValueOnce({
      rows: [{ email: userEmail }],
    });

    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const result = await usuarioService.updateUser(userEmail, updatedUserData);

    expect(result).toEqual({ message: "Usuário atualizado com sucesso" });

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      [userEmail]
    );

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE users SET username = $1, favoriteactivity = $2 WHERE email = $3",
      ["newTestUser", "newCoding", userEmail]
    );
  });

  it("should throw an error if user does not exist", async () => {
    const userEmail = "nonexistent@example.com";
    const updatedUserData = {
      username: "newTestUser",
      favoriteactivity: "newCoding",
    };

    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(
      usuarioService.updateUser(userEmail, updatedUserData)
    ).rejects.toThrow("Usuário não encontrado");

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      [userEmail]
    );
  });

  it("should throw an error if there is a problem with the database during update", async () => {
    const userEmail = "test@example.com";
    const updatedUserData = {
      username: "newTestUser",
      favoriteactivity: "newCoding",
    };

    pool.query.mockResolvedValueOnce({
      rows: [{ email: userEmail }],
    });

    pool.query.mockRejectedValueOnce(new Error("Erro de conexão"));

    await expect(
      usuarioService.updateUser(userEmail, updatedUserData)
    ).rejects.toThrow("Erro ao atualizar usuário: Erro de conexão");

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      [userEmail]
    );

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE users SET username = $1, favoriteactivity = $2 WHERE email = $3",
      ["newTestUser", "newCoding", userEmail]
    );
  });
});
