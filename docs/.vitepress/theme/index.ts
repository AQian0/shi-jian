import type { Theme } from "vitepress";

import DefaultTheme from "vitepress/theme";
// https://vitepress.dev/guide/custom-theme
import { h } from "vue";

// oxlint-disable-next-line no-unassigned-import
import "./style.css";

// oxlint-disable-next-line no-default-export
export default {
  extends: DefaultTheme,
  Layout: (): ReturnType<typeof h> => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp(): void {
    // ...
  },
} satisfies Theme;
