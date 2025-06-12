import type { CarsRepository } from '@/repositories/cars.repository'
import { getAbbreviation } from '@/utils/get-abbreviation'
import type { Car } from '../../generated/prisma'
import type { CreateCarSchema } from '../schemas/create-car.schema'

interface CreateCarUseCaseResponse {
  car: Car
}

export class CreateCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  private async generateCarInternalId({
    brand,
    model,
    year,
    color,
  }: CreateCarSchema): Promise<string> {
    const abbreviatedBrand = getAbbreviation(brand)
    const abbreviatedModel = getAbbreviation(model)
    const yearStr = year.toString()
    const abbreviatedColor = getAbbreviation(color)

    const carIdPrefix = `${abbreviatedBrand}${abbreviatedModel}${yearStr}${abbreviatedColor}`

    const carCount = await this.carsRepository.count()

    const carSequence = (carCount + 1).toString().padStart(3, '0')

    const internalCarId = `${carIdPrefix}${carSequence}`

    return internalCarId
  }

  async execute({
    brand,
    model,
    year,
    color,
  }: CreateCarSchema): Promise<CreateCarUseCaseResponse> {
    const internalId = await this.generateCarInternalId({
      brand,
      model,
      year,
      color,
    })

    const car = await this.carsRepository.create({
      internal_id: internalId,
      brand,
      model,
      year,
      color,
    })

    return { car }
  }
}
