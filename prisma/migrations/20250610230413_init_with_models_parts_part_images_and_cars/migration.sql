-- CreateEnum
CREATE TYPE "part_condition" AS ENUM ('BOA', 'MÉDIA', 'RUIM');

-- CreateTable
CREATE TABLE "parts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "condition" "part_condition" NOT NULL,
    "stock_address" TEXT NOT NULL,
    "dimensions" JSONB,
    "weight" DECIMAL(5,2),
    "compatibility" JSONB,
    "min_price" DECIMAL(10,2),
    "suggested_price" DECIMAL(10,2),
    "max_price" DECIMAL(10,2),
    "ad_title" TEXT,
    "ad_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "car_id" TEXT NOT NULL,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_images" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimetype" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "part_id" TEXT NOT NULL,

    CONSTRAINT "part_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "internal_id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "part_images_filename_key" ON "part_images"("filename");

-- CreateIndex
CREATE INDEX "part_images_part_id_idx" ON "part_images"("part_id");

-- CreateIndex
CREATE UNIQUE INDEX "cars_internal_id_key" ON "cars"("internal_id");

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_images" ADD CONSTRAINT "part_images_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
