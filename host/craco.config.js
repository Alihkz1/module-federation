const deps = require("./package.json").dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { ModuleFederationPlugin } = require("webpack").container;

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            remote: "remote@http://localhost:3001/remoteEntry.js",
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        })
      );

      return webpackConfig;
    },
  },
};
