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
      { name: "og:image", content: "https://dtapline.com/showcase.gif" },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      { name: "twitter:image", content: "https://dtapline.com/showcase.gif" },
    ],
    // Google Analytics
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-7GTBT807M9",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-7GTBT807M9');",
    ],
  ],

  themeConfig: {
    logo: "/logo.png",
    siteTitle: false, // Hide "Dtapline" text next to logo

    nav: nav(),

    sidebar: {
      "/docs/": sidebarDocs(),
    },

    editLink: {
      pattern: "https://github.com/dtapline/landing/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/dtapline" }],

    footer: {
      message: "Built with modern technology for open source teams.",
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
    { text: "Docs", link: "/docs/introduction", activeMatch: "/docs/" },
    { text: "Sponsor", link: "https://github.com/sponsors/floydspace" },
    {
      text: "Account",
      items: [
        { text: "Login", link: "https://app.dtapline.com/login" },
        { text: "Sign Up", link: "https://app.dtapline.com/signup" },
      ],
    },
  ];
}

function sidebarDocs() {
  return [
    {
      text: "Introduction",
      link: "/docs/introduction",
    },
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
