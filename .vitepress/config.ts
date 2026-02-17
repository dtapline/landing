import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Dtapline",
  description:
    "Track and visualize deployments across your environments and services",

  lastUpdated: true,
  cleanUrls: true,

  // Ignore dead links for localhost URLs (used in code examples)
  ignoreDeadLinks: [/^http:\/\/localhost/, /^https:\/\/localhost/],

  head: [
    ["link", { rel: "icon", type: "image/png", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#145" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    ["meta", { name: "og:site_name", content: "Dtapline" }],
    [
      "meta",
      { name: "og:image", content: "https://dtapline.com/showcase.png" },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      { name: "twitter:image", content: "https://dtapline.com/showcase.png" },
    ],
    // Google Analytics - Replace YOUR_GA_ID with your actual Google Analytics ID
    // ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID' }],
    // ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'YOUR_GA_ID');"],
  ],

  themeConfig: {
    logo: "/logo.png",
    siteTitle: false, // Hide "Dtapline" text next to logo

    nav: nav(),

    sidebar: {
      "/docs/": sidebarDocs(),
    },

    editLink: {
      pattern: "https://github.com/dtapline/dtapline/edit/main/landing/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/dtapline/dtapline" },
    ],

    footer: {
      message: "Released under the AGPL-3.0 License.",
      copyright: "Copyright © 2026-present Dtapline Contributors",
    },

    search: {
      provider: "local",
    },
  },
});

function nav() {
  return [
    { text: "Home", link: "/" },
    { text: "Docs", link: "/docs/cli-integration", activeMatch: "/docs/" },
    { text: "Demo", link: "https://app.dtapline.com/demo" },
    {
      text: "GitHub",
      link: "https://github.com/dtapline/dtapline",
    },
  ];
}

function sidebarDocs() {
  return [
    {
      text: "CLI Integration",
      link: "/docs/cli-integration",
    },
    {
      text: "CI/CD Examples",
      link: "/docs/ci-cd-examples",
    },
  ];
}
