/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL:
      "postgres://default:Jg3NV6QuMzfq@ep-restless-hill-14773517-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    POSTGRES_PRISMA_URL:
      "postgres://default:Jg3NV6QuMzfq@ep-restless-hill-14773517-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
    POSTGRES_URL_NO_SSL:
      "postgres://default:Jg3NV6QuMzfq@ep-restless-hill-14773517-pooler.us-east-1.aws.neon.tech:5432/verceldb",
    POSTGRES_URL_NON_POOLING:
      "postgres://default:Jg3NV6QuMzfq@ep-restless-hill-14773517.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    POSTGRES_USER: "default",
    POSTGRES_HOST: "ep-restless-hill-14773517-pooler.us-east-1.aws.neon.tech",
    POSTGRES_PASSWORD: "Jg3NV6QuMzfq",
    POSTGRES_DATABASE: "verceldb",
  },
};

export default nextConfig;
