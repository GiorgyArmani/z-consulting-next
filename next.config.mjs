/** @type {import('next').NextConfig} */
const nextConfig = {
  // ogl ships as ESM; let Next transpile it for the client bundle.
  transpilePackages: ['ogl'],
};

export default nextConfig;
