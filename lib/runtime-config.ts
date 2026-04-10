import path from "node:path";

const DEFAULT_SQLITE_URL = "file:./prisma/dev.db";
const DEV_JWT_SECRET = "dev-only-change-me";
let hasWarnedAboutDatabaseUrl = false;

export function getDatabaseUrl(): string {
  const configuredUrl = process.env.DATABASE_URL?.trim();
  if (!configuredUrl) {
    return DEFAULT_SQLITE_URL;
  }

  if (configuredUrl.startsWith("file:")) {
    return configuredUrl;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`Unsupported DATABASE_URL: ${configuredUrl}. This app is configured for SQLite file URLs.`);
  }

  if (!hasWarnedAboutDatabaseUrl) {
    console.warn(`Ignoring unsupported DATABASE_URL in development: ${configuredUrl}`);
    hasWarnedAboutDatabaseUrl = true;
  }

  return DEFAULT_SQLITE_URL;
}

export function resolveSqliteFilePath(databaseUrl: string): string {
  if (!databaseUrl.startsWith("file:")) {
    throw new Error(`Unsupported DATABASE_URL: ${databaseUrl}. This app is configured for SQLite file URLs.`);
  }

  const rawPath = databaseUrl.slice("file:".length);
  if (!rawPath) {
    throw new Error("DATABASE_URL must include a SQLite file path.");
  }

  return path.isAbsolute(rawPath)
    ? rawPath
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), rawPath);
}

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set in production.");
  }

  return DEV_JWT_SECRET;
}
