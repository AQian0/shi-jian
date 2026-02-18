import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
// oxlint-disable-next-line no-default-export
export default defineConfig({
  title: "shi-jian",
  description: "现代 JavaScript 日期处理库",
  lang: "zh-CN",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "指南",
        link: "/guide/getting-started",
      },
      {
        text: "API",
        link: "/api/",
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "开始",
          items: [
            { text: "简介", link: "/guide/" },
            { text: "快速开始", link: "/guide/getting-started" },
          ],
        },
        {
          text: "基础",
          items: [
            { text: "格式化", link: "/guide/formatting" },
            { text: "解析", link: "/guide/parsing" },
            { text: "日期运算", link: "/guide/manipulation" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "时区处理", link: "/guide/timezone" },
            { text: "本地化", link: "/guide/i18n" },
            { text: "TypeScript", link: "/guide/typescript" },
          ],
        },
      ],
      "/api/": [
        {
          text: "格式化",
          items: [
            { text: "format", link: "/api/format" },
            { text: "formatStr", link: "/api/formatStr" },
          ],
        },
        {
          text: "解析",
          items: [
            { text: "parse", link: "/api/parse" },
            { text: "parseParts", link: "/api/parseParts" },
            { text: "parts", link: "/api/parts" },
          ],
        },
        {
          text: "日期运算",
          items: [
            { text: "addDays", link: "/api/addDays" },
            { text: "addMonths", link: "/api/addMonths" },
            { text: "addYears", link: "/api/addYears" },
            { text: "addHours", link: "/api/addHours" },
            { text: "addMinutes", link: "/api/addMinutes" },
            { text: "addSeconds", link: "/api/addSeconds" },
          ],
        },
        {
          text: "日期边界",
          items: [
            { text: "dayStart", link: "/api/dayStart" },
            { text: "dayEnd", link: "/api/dayEnd" },
            { text: "weekStart", link: "/api/weekStart" },
            { text: "weekEnd", link: "/api/weekEnd" },
            { text: "monthStart", link: "/api/monthStart" },
            { text: "monthEnd", link: "/api/monthEnd" },
            { text: "yearStart", link: "/api/yearStart" },
            { text: "yearEnd", link: "/api/yearEnd" },
            { text: "hourStart", link: "/api/hourStart" },
            { text: "hourEnd", link: "/api/hourEnd" },
            { text: "minuteStart", link: "/api/minuteStart" },
            { text: "minuteEnd", link: "/api/minuteEnd" },
          ],
        },
        {
          text: "时区",
          items: [
            { text: "offset", link: "/api/offset" },
            { text: "applyOffset", link: "/api/applyOffset" },
            { text: "removeOffset", link: "/api/removeOffset" },
            { text: "tzDate", link: "/api/tzDate" },
          ],
        },
        {
          text: "辅助函数",
          items: [
            { text: "normalizeDate", link: "/api/normalizeDate" },
            { text: "monthDays", link: "/api/monthDays" },
            { text: "yearDays", link: "/api/yearDays" },
            { text: "dayOfYear", link: "/api/dayOfYear" },
            { text: "nearestDay", link: "/api/nearestDay" },
            { text: "fourDigitYear", link: "/api/fourDigitYear" },
            { text: "ap", link: "/api/ap" },
            { text: "range", link: "/api/range" },
            { text: "isIso8601", link: "/api/isIso8601" },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/AQian0/shi-jian",
      },
    ],

    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2024-present",
    },
  },
});
