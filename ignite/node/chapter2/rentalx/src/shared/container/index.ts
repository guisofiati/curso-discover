import "reflect-metadata";
import { container } from "tsyringe";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UserRepository";
import { IUsersRepository } from "@modules/account/repositories/IUserRepository";
import { CarRepository } from "@modules/car/infra/typeorm/repositories/CarRepository";
import { CategoryRepository } from "@modules/car/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/car/infra/typeorm/repositories/SpecificationRepository";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { ICategoryRepository } from "@modules/car/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/car/repositories/ISpecificationRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository,
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository,
);

container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarsRepository>("CarRepository", CarRepository);
