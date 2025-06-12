import { prisma } from '@/lib/prisma'
import type { Car, Prisma } from '../../../generated/prisma'
import type { CarsRepository } from '../cars.repository'

export class PrismaCarsRepository implements CarsRepository {
  async create(data: Prisma.CarCreateInput) {
    const car = await prisma.car.create({ data })

    return car
  }

  async count() {
    const carCount = await prisma.car.count()

    return carCount
  }

  async delete(id: string) {
    await prisma.car.delete({
      where: { id },
    })
  }

  async findById(id: string) {
    const car = await prisma.car.findUnique({
      where: { id },
    })

    return car
  }
}
