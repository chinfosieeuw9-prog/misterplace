module.exports = {
  images: {
    domains: [
      'cdn.tweakers.net',
      'www.androidworld.nl',
      'nl.hardware.info',
      'blogs.windows.com',
      'www.iculture.nl'
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://elwiaaugvavnjllatrlh.supabase.co;"
          }
        ],
      },
    ];
  },
};
