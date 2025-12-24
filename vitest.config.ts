import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      TZ: "America/New_York",
      LC_ALL: "en_US.UTF-8",
    },
  },
});
