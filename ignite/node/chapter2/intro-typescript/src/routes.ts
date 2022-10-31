import { Request, Response } from "express";
import CreateCarService from "./CreateCarService";

// colocando o conteudo em arquivo separado, para nao poluir o server.ts
export function createCar(request: Request, response: Response) {
  CreateCarService.execute({
    year: 2007,
    company: "Toyota",
    country: "Japan",
  }); // "2007" -> erro

  return response.send();
}
