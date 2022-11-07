import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryRepository = CategoryRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);

export { importCategoryController };
