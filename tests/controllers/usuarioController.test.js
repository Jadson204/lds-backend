const request = require("supertest");
const app = require("../../app"); // Caminho para o arquivo app.js
const chance = require("chance").Chance();

describe("Usuario Controller", () => {
  let server;

  // Inicia o servidor antes de todos os testes
  beforeAll((done) => {
    server = app.listen(3000, done);
  });

  // Fecha o servidor depois de todos os testes
  afterAll((done) => {
    server.close(done);
  });

  const email = chance.email();

  it("should create a new user", async () => {
    const newUser = {
      nome: chance.name(),
      email: email,
      senha: chance.string({ length: 8 }),
    };

    const res = await request(server)
      .post("/api/usuarios")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(newUser.email);
  });

  it("should get a user by email", async () => {
    const res = await request(server)
      .get(`/api/usuarios/${email}`)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
  });

  it("should update a user", async () => {
    const updatedUser = {
      favoriteactivity: "Running",
    };

    const res = await request(server)
      .patch(`/api/usuarios/${email}`)
      .send(updatedUser)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.favoriteactivity).toBe(updatedUser.favoriteactivity);
  });

  it("should delete a user", async () => {
    const res = await request(server)
      .delete(`/api/usuarios/${email}`)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });
});
