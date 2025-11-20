const nextConfig = {
  /* config options here */
  serverActions: {
    bodySizeLimit: '10mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // Add your API's hostname here.
      // For local development, this is often 'localhost'.
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000', // Adjusted port
        pathname: '/api/uploads/**', // Adjusted pathname
      },
    ],
  }
};

export default nextConfig;
