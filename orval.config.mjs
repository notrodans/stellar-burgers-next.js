const orvalConfig = {
  main: {
    input: "./src/shared/api/schema.yaml",
    output: {
      target: "./src/shared/api/generated.ts",
      prettier: true,
      client: "swr",
      override: {
        mutator: {
          path: "./src/shared/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
};

export default orvalConfig;
