/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // No next/image on the site: switch the optimizer endpoint off to remove its attack surface.
  images: { unoptimized: true },
  async headers() {
    return [
      { source: '/motion/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};
export default nextConfig;
