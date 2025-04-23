import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      use: ["@svgr/webpack"],
    });

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    deviceSizes: [640, 1200, 1680],
  },
  // images: {
  //
  //
  // },
  // output: "export",  // <=== enables static exports
  // distDir: "dist",  // <=== change the build directory
};
// export default withNextIntl(nextConfig);
export default withNextIntl(nextConfig);
