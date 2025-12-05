import { prisma } from "../src/utils/database-util"

// const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (optional)
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.restaurant.deleteMany();

  // Create customers
  const customers = await prisma.customer.createMany({
    data: [
      { name: "Alice", phone: "081234567890" },
      { name: "Bob", phone: "081234567891" },
      { name: "Charlie", phone: "081234567892" },
    ],
    skipDuplicates: true, // in case you run seed multiple times
  });

  // Create restaurants
  const restaurants = await prisma.restaurant.createMany({
    data: [
      { name: "Pizza Palace", description: "Best pizza in town", isOpen: true },
      { name: "Sushi Spot", description: "Fresh sushi daily", isOpen: true },
      { name: "Burger Barn", description: "Juicy burgers and fries", isOpen: false },
    ],
    skipDuplicates: true,
  });

  // Fetch created customers and restaurants to get their IDs
  const customerRecords = await prisma.customer.findMany();
  const restaurantRecords = await prisma.restaurant.findMany();

  // Create orders
  await prisma.order.createMany({
    data: [
      { customerId: customerRecords[0].id, restaurantId: restaurantRecords[0].id, itemAmount: 2 },
      { customerId: customerRecords[0].id, restaurantId: restaurantRecords[1].id, itemAmount: 1 },
      { customerId: customerRecords[1].id, restaurantId: restaurantRecords[1].id, itemAmount: 3 },
      { customerId: customerRecords[2].id, restaurantId: restaurantRecords[2].id, itemAmount: 2 },
      { customerId: customerRecords[2].id, restaurantId: restaurantRecords[0].id, itemAmount: 1 },
    ],
  });

  console.log("✅ Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });