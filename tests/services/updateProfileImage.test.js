const usuarioService = require("../../src/services/usuarioService");
const pool = require("../../src/config/database");

jest.mock("../../src/config/database");

describe("updateProfileImage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the profile image successfully", async () => {
    const mockUser = { email: "test@example.com", profile_image: "oldImage" };
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });

    const imageBuffer = Buffer.from("newImage");
    const result = await usuarioService.updateProfileImage(
      "test@example.com",
      imageBuffer
    );

    expect(result).toEqual(mockUser);
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE users SET profile_image = $1 WHERE email = $2 RETURNING *",
      [imageBuffer, "test@example.com"]
    );
  });

  it("should throw an error if the user is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const imageBuffer = Buffer.from("newImage");

    await expect(
      usuarioService.updateProfileImage("test@example.com", imageBuffer)
    ).rejects.toThrow("Usuário não encontrado");
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE users SET profile_image = $1 WHERE email = $2 RETURNING *",
      [imageBuffer, "test@example.com"]
    );
  });

  it("should handle database errors", async () => {
    pool.query.mockRejectedValueOnce(new Error("Database error"));

    const imageBuffer = Buffer.from("newImage");

    await expect(
      usuarioService.updateProfileImage("test@example.com", imageBuffer)
    ).rejects.toThrow("Erro ao atualizar imagem de perfil: Database error");
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE users SET profile_image = $1 WHERE email = $2 RETURNING *",
      [imageBuffer, "test@example.com"]
    );
  });
});
