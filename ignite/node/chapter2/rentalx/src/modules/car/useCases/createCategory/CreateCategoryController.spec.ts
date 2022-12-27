import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", driver_license, created_at)
    VALUES('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'ABC-12345', now())`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/auth").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    // console.log(responseToken.body);

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Test",
        description: "Category description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category when category name already exists", async () => {
    const responseToken = await request(app).post("/auth").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Test",
        description: "Category description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
