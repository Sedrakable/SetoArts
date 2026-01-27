import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Add babel-loader + svgr for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-react", { runtime: "automatic" }]],
          },
        },
        {
          loader: "@svgr/webpack",
          options: {
            babel: false,
          },
        },
      ],
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    deviceSizes: [640, 1200, 1680],
  },
};

export default withNextIntl(nextConfig);
