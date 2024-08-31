module.exports = {
  resolve: {
    fallback: {
      https: require.resolve('https-browserify'),
      querystring: require.resolve('querystring-es3'),
      url: require.resolve('url/'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      child_process: false,
      fs: false,
      net: false,
      tls: false,
    },
  }
}
