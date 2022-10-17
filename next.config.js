/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-CA", "fr-CA"],
    defaultLocale: "en-CA",
  },
};

module.exports = nextConfig;
