const orvalConfig = {
  public: {
    input: "./src/shared/api/schemas/public.yaml",
    output: {
      target: "./src/shared/api/public-generated.ts",
      prettier: true,
      client: "swr",
      override: {
        mutator: {
          path: "./src/shared/api/api-instance.ts",
          name: "createInstancePublic",
        },
      },
    },
  },
  private: {
    input: "./src/shared/api/schemas/private.yaml",
    output: {
      target: "./src/shared/api/private-generated.ts",
      prettier: true,
      client: "swr",
      override: {
        mutator: {
          path: "./src/shared/api/api-instance.ts",
          name: "createInstancePrivate",
        },
      },
    },
  },
};

export default orvalConfig;
