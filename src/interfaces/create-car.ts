import { ICar } from "./car";

export type CreateCar = Omit<ICar, "status">;
