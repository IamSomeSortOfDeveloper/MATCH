import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "sbueseii",
    dataset: "production",
  },
  studioHost: "match-studio", //unique value
});
