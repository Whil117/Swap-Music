/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', "via.placeholder.com", "seed-mix-image.spotifycdn.com", 'dailymix-images.scdn.co']
  },
  experimental: {
    esmExternals: false
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
}