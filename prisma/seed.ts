import { prisma } from '@/lib/prisma'

// Reset database
async function deleteAllDatabase() {
  await prisma.part.deleteMany()
  await prisma.car.deleteMany()

  console.log('Database reset!')
}

// Create car

function getAbbreviation(value: string) {
  const abbreviatedValue = value.slice(0, 3).toUpperCase()
  return abbreviatedValue
}

async function generateCarInternalId(
  brand: string,
  model: string,
  year: number,
  color: string
) {
  const abbreviatedBrand = getAbbreviation(brand)
  const abbreviatedModel = getAbbreviation(model)
  const yearStr = year.toString()
  const abbreviatedColor = getAbbreviation(color)

  const carIdPrefix = `${abbreviatedBrand}${abbreviatedModel}${yearStr}${abbreviatedColor}`

  const carCount = await prisma.car.count()

  const carsSequence = (carCount + 1).toString().padStart(3, '0')

  const internalCarId = `${carIdPrefix}${carsSequence}`

  return internalCarId
}

async function createCar(
  brand: string,
  model: string,
  year: number,
  color: string
) {
  const internalId = await generateCarInternalId(brand, model, year, color)

  const car = await prisma.car.create({
    data: {
      internal_id: internalId,
      brand,
      model,
      year,
      color,
    },
  })

  console.log('Created car!')
  return car.id
}

// Create part

async function createPart(
  name: string,
  description: string,
  condition: 'BOA' | 'MÉDIA' | 'RUIM',
  stockAddress: string,
  dimensions: object,
  weight: number,
  compatibility: object[],
  minPrice: number,
  suggestedPrice: number,
  maxPrice: number,
  adTitle: string,
  adDescription: string,
  images: { filename: string; url: string; mimetype: string }[],
  carId: string
) {
  await prisma.part.create({
    data: {
      name,
      description,
      condition,
      stock_address: stockAddress,
      dimensions,
      weight,
      compatibility,
      min_price: minPrice,
      suggested_price: suggestedPrice,
      max_price: maxPrice,
      ad_title: adTitle,
      ad_description: adDescription,
      car_id: carId,
      images: {
        createMany: { data: images },
      },
    },
  })

  console.log('Created part!')
}

// function to create seed

async function main() {
  await deleteAllDatabase()

  const fiatStradaCar = await createCar('Fiat', 'Strada', 2016, 'Preto')
  const tCrossCar = await createCar('Volkswagen', 'TCross', 2025, 'Cinza')
  await createCar('Chevrolet', 'Onix', 2023, 'Cinza')
  await createCar('Volkswagen', 'Nivus', 2024, 'Branco')
  await createCar('Fiat', 'Pulse', 2024, 'Azul')

  await createPart(
    'Para-lama dianteiro',
    'O para-choque dianteiro é uma peça metálica instalada nas laterais frontais do veículo, responsável por proteger as rodas e a parte inferior da carroceria contra lama, pedras, água e outros detritos que podem ser levantados pelo movimento das rodas. Além disso, contribui para a estética e aerodinâmica do carro, servindo também como suporte para outros componentes, como o farol e o pisca. Normalmente feita de aço ou alumínio, pode ser pintada para combinar com a cor do veículo.',
    'BOA',
    'A1',
    { width: 1.5, height: 0.5, depth: 0.4, unit: 'm' },
    12.5,
    [{ brand: 'Fiat', model: 'Strada', year: [2016, 2017, 2018, 2020] }],
    251.5,
    309.9,
    410.99,
    'Para-choque Strada 2016 Original Usado',
    'Para-choque dianteiro para Fiat Strada, ano 2016. Em excelente estado de conservação, peça original.',
    [
      {
        filename: 'parachoque-strada-1.webp',
        url: 'https://http2.mlstatic.com/D_NQ_NP_654390-MLB47513412612_092021-O-kit-parachoque-dianteiro-strada-working-2014-2015-2016-2017.webp',
        mimetype: 'image/webp',
      },
      {
        filename: 'parachoque-strada-2.webp',
        url: 'https://http2.mlstatic.com/D_NQ_NP_840532-MLB47513412611_092021-O-kit-parachoque-dianteiro-strada-working-2014-2015-2016-2017.webp',
        mimetype: 'image/webp',
      },
    ],
    fiatStradaCar
  )
  await createPart(
    'Retrovisor Direito',
    'Retrovisor elétrico, com seta, original Volkswagen.',
    'MÉDIA',
    'W7',
    { width: 0.3, height: 0.25, depth: 0.15, unit: 'm' },
    1.5,
    [
      {
        brand: 'Volkswagen',
        model: 'T-Cross',
        year: [2020, 2021, 2022, 2023, 2024, 2025],
      },
    ],
    350.0,
    400.0,
    450.0,
    'Retrovisor T-Cross 2025 Original',
    'Retrovisor elétrico com pisca para VW T-Cross, modelo 2025. Perfeito estado.',
    [
      {
        filename: 'retrovisor-tcross-1.webp',
        url: 'https://http2.mlstatic.com/D_NQ_NP_931209-MLB79776724415_102024-O-retrovisor-direito-volkswagen-t-cross-2019-2020-2021-2022.webp',
        mimetype: 'image/webp',
      },
    ],
    tCrossCar
  )

  console.log('Database seeded successfully!')
}

main()
