/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Activar para exportar modo client only
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8080/:path*'
      }
    ]
  }
}

module.exports = nextConfig
