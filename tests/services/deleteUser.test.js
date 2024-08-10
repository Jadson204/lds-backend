const usuarioService = require("../../src/services/usuarioService");
const pool = require("../../src/config/database");

jest.mock("../../src/config/database");

describe("Usuario Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a user", async () => {
    const email = "test@example.com";

    pool.query.mockResolvedValue({ rowCount: 1 });

    const result = await usuarioService.deleteUser(email);

    expect(result).toEqual({
      success: true,
      message: "Usuário deletado com sucesso",
    });

    expect(pool.query).toHaveBeenCalledTimes(1);

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM users WHERE email = $1",
      [email]
    );
  });

  it("should throw an error if there is a problem with the database", async () => {
    const email = "test@example.com";

    pool.query.mockRejectedValue(new Error("Erro de conexão"));

    await expect(usuarioService.deleteUser(email)).rejects.toThrow(
      "Erro ao excluir usuário: Erro de conexão"
    );

    expect(pool.query).toHaveBeenCalledTimes(1);

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM users WHERE email = $1",
      [email]
    );
  });

  it("should log an error if delete fails", async () => {
    const email = "test@example.com";
    const errorMessage = "Erro ao excluir usuário: Erro de conexão";

    pool.query.mockRejectedValue(new Error("Erro de conexão"));

    console.error = jest.fn();

    await expect(usuarioService.deleteUser(email)).rejects.toThrow(
      errorMessage
    );

    expect(console.error).toHaveBeenCalledWith(
      "Erro ao excluir usuário:",
      expect.any(Error)
    );
  });
});
