import type { CarsRepository } from '../repositories/cars.repository'

export class DeleteCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute(id: string): Promise<void> {
    const car = await this.carsRepository.findById(id)

    if (!car) {
      throw new Error('Veículo não encontrado')
    }

    await this.carsRepository.delete(car.id)
  }
}
