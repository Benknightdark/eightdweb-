module.exports = {
  cacheId:"EightdCache",
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/**'
  ],
  stripPrefix: 'dist/',
  runtimeCaching: [{
    urlPattern: "https://firebasestorage.googleapis.com",
    handler: 'networkFirst'
  }]
};
