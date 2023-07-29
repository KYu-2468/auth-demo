// Import env variables from .env
require("dotenv").config();

const { db, User } = require("../db");

const users = createDummyUsers(20);

async function seed() {
  console.log("Seeding...");
  await db.sync({ force: true });

  const user = await User.create({
    email: `test@ttp.com`,
    password: "test",
  });

  await User.bulkCreate(users);
}

seed().then(() => {
  console.log("Seeding Complete!");
  process.exit();
});

function createDummyUsers(numOfUsers) {
  const users = [];

  for (let i = 0; i < numOfUsers; i++) {
    users.push({
      email: `test${i}@test.com`,
      password: "test",
      organizationId: 1,
    });
  }

  return users;
}
