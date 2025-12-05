-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(100) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemAmount" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_name_key" ON "customers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_name_key" ON "restaurants"("name");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
