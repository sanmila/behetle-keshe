import { defineConfig } from "prisma/config";
import { getDatabaseUrl } from "@/lib/runtime-config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: getDatabaseUrl(),
  },
  migrations: {
    path: "./prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
