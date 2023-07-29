const app = require("./app");
const { db } = require("./db");

const PORT = process.env.PORT || 8080;

module.exports = app;

init();

async function init() {
  await db.sync();
  app.listen(PORT, () => {
    console.log("listening to port", PORT);
  });
}
