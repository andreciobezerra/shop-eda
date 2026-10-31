import { z } from "zod";

export const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  API_PREFIX: z.string().min(1).default("api"),
  CORS_ORIGIN: z.string().min(1).default("*"),
  DB_HOST: z.string().min(1).default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_USERNAME: z.string().min(1).default("postgres"),
  DB_PASSWORD: z.string().min(1).default("postgres"),
  DB_NAME: z.string().min(1).default("shop_eda"),
});

export type EnvironmentVariables = z.infer<typeof environmentSchema>;

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const result = environmentSchema.safeParse(config);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "config"}: ${issue.message}`)
      .join("; ");

    throw new Error(`Environment validation failed: ${details}`);
  }

  return result.data;
}
