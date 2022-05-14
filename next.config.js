/** @type {import('next').NextConfig} */
module.exports = {

  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', "via.placeholder.com", "seed-mix-image.spotifycdn.com", 'dailymix-images.scdn.co']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
}