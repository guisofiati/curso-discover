import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterUseCase } from "./register";

describe("Register use case", () => {
  it("it should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "123456",
    });

    // console.log(user.password_hash);

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with email in use", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "john@gmail.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
