import type { Car, Prisma } from '../../generated/prisma'

export interface CarsRepository {
  create(data: Prisma.CarCreateInput): Promise<Car>
  count(): Promise<number>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Car | null>
}
