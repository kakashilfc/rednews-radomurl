/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // Uncomment the line below to enable basePath, pages and
  // redirects will then have a path prefix (`/app` in this case)
  //
  // basePath: '/app',
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
    ],
    unoptimized: true,
  },

  async redirects() {
    return [
      // Path Matching - will match `/old-blog/a`, but not `/old-blog/a/b`
      /*{
        source: '/old-blog/:slug',
        destination: '/news/:slug',
        permanent: false,
      },
      // Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
      {
        source: '/posts/:slug*',
        destination: '/:slug*',
        permanent: false,
      },
      
      {
        source: '/posts/:slug(\\d{1,})',
        destination: '/:slug',
        permanent: false,
      },*/
    ]
  },
}

module.exports = nextConfig
