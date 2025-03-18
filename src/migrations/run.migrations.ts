import { umzugConfig } from "../config";

async function run() {
  try {
    await umzugConfig.up(); // Применяем все миграции
    console.log("Migrations completed");
  } catch (err) {
    console.error("Migration failed", err);
  }
}

run();
