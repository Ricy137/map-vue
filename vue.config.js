/*
 * @Author: ysy
 * @LastEditors: ysy
 * @Date: 2022-01-30 13:17:48
 * @LastEditTime: 2022-01-30 14:21:48
 * @FilePath: \vue.config.js
 */
const path = require("path");
const AutoDllPlugin = require("autodll-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzip = true;
const productionGzipExtensions = ["js", "css"];

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: (config) => {
    Object.assign(config.resolve.alias, {
      "@": resolve("src"),
    });
    if (process.env.NODE_ENV !== "production") {
      config.devtool = "source-map";
      config.plugins.push(
        new AutoDllPlugin({
          inject: true,
          debug: true,
          filename: "[name]_[hash].js",
          path: "./dll" + Date.parse(new Date()),
          entry: {
            vendor_vue: ["vue", "vuex", "vue-router"],
            vendor_tools: ["axios", "core-js"],
          },
        })
      );
      productionGzip &&
        config.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8,
          })
        );
    } else if (process.env.NODE_ENV === "development") {
      config.devServer = {
        disableHostCheck: true,
      };
    }
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].VUE_APP_NAME = process.env.VUE_APP_NAME;
      return args;
    });
  },
  devServer: {
    proxy: {
      "/algolet": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
          // 路径重写
          "/algolet": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        }
      }
    }
  }
};
