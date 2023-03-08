import type { Config } from "prismic-ts-codegen";

const config: Config = {
  output: "./src/types/prismic-types.generated.ts",
  models: ["./customtypes/**/index.json", "./slices/**/model.json"],
};

export default config;
