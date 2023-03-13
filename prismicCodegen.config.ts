import type { Config } from "prismic-ts-codegen";

const config: Config = {
  repositoryName: "https://justine-prismic-portfolio.prismic.io",
  output: "./src/types/prismic-types.generated.ts",
  models: ["./customtypes/**/index.json", "./slices/**/model.json"],
  clientIntegration: {
    includeCreateClientInterface: true,
  },
};

export default config;
