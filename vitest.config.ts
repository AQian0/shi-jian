import { defineConfig } from "vitest/config";

// oxlint-disable-next-line no-default-export
export default defineConfig({
  test: {
    env: {
      TZ: "America/New_York",
      LC_ALL: "en_US.UTF-8",
    },
  },
});
