import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const port: number = ((process.env.POSTGRES_PORT as unknown) as number) ?? 5432;

const DATABASE_URL = process.env.DATABASE_URL;

export const ormConfig: PostgresConnectionOptions = DATABASE_URL
  ? {
      type: "postgres",
      url: DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"]
    }
  : {
      type: "postgres",
      host: process.env.POSTGRES_HOST ?? "localhost",
      port,
      username: process.env.POSTGRES_USER ?? "postgres",
      password: process.env.POSTGRES_PASSWORD ?? "postgres",
      database: process.env.POSTGRES_DB ?? "postgres",
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"]
    };
