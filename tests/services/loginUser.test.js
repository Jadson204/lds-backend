const usuarioService = require("../../src/services/usuarioService");
const pool = require("../../src/config/database");

jest.mock("../../src/config/database");

describe("loginUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login a user successfully", async () => {
    const mockUser = { email: "test@example.com", password: "password123" };
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });

    const result = await usuarioService.loginUser(
      "test@example.com",
      "password123"
    );
    expect(result).toEqual(mockUser);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      ["test@example.com"]
    );
  });

  it("should throw an error if the user is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(
      usuarioService.loginUser("test@example.com", "password123")
    ).rejects.toThrow("Usuário não encontrado");
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      ["test@example.com"]
    );
  });

  it("should throw an error if the password is incorrect", async () => {
    const mockUser = { email: "test@example.com", password: "correctPassword" };
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });

    await expect(
      usuarioService.loginUser("test@example.com", "incorrectPassword")
    ).rejects.toThrow("Email ou senha incorretos");
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      ["test@example.com"]
    );
  });
});
