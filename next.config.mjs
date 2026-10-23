// Applied to every response. The CSP sets only directives that cannot block Next.js scripts, styles,
// fonts, the films or Vercel Analytics; a full script policy would need per-request nonces.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // No next/image on the site: switch the optimizer endpoint off to remove its attack surface.
  images: { unoptimized: true },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/motion/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};
export default nextConfig;
