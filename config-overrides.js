module.exports = {
    webpack: (config, env) => {
      // Agregar polyfills para 'http' y 'https' en el cliente (react)
      config.resolve.fallback = {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        url: require.resolve('url/'),
        buffer: require.resolve('buffer/')
      };
  
      return config;
    },
  };
  