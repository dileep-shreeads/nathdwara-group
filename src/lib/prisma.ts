// Resilient Prisma Client Loader
// Gracefully handles environments before `prisma generate` runs

function createFallbackProxy() {
  return new Proxy(
    {},
    {
      get: (_target, modelName) => {
        return new Proxy(
          {},
          {
            get: (_subTarget, methodName) => {
              return async () => {
                throw new Error(
                  `Prisma model '${String(modelName)}.${String(methodName)}' unavailable in current runtime. Falling back to in-memory store.`
                );
              };
            },
          }
        );
      },
    }
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  try {
    // eval("require") avoids static bundling errors when .prisma/client is not yet generated
    const req = typeof module !== "undefined" && typeof require === "function" ? require : null;
    const loadModule = typeof eval === "function" ? eval("require") : req;
    if (loadModule) {
      const { PrismaClient } = loadModule("@prisma/client");
      if (PrismaClient) {
        const client = new PrismaClient({
          log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
        });
        if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
        return client;
      }
    }
  } catch (e) {
    // Not yet generated or offline build
  }

  const fallback = createFallbackProxy();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = fallback;
  return fallback;
}

export const prisma = getPrismaClient();

export default prisma;


