module.exports = {
  //   configureWebpack: {
  //     resolve: {
  //       alias: {
  //         'views': '@/views',
  //         'components': '@/components',
  //         'network': '@/network',
  //         'common': '@/common',
  //         'assets': '@/assets',
  //       }
  //     }
  //   }
  devServer: {
    proxy: {
      "/room": {
        // target: "http://47.98.226.145/homestay",
        target: "http://localhost/homestay",
        changeOrigin: true,
      },
      "/user": {
        // target: "http://47.98.226.145/homestay",
        target: "http://localhost/homestay",
        changeOrigin: true,
      },
      "/order": {
        // target: "http://47.98.226.145/homestay",
        target: "http://localhost/homestay",
        changeOrigin: true,
      },
    },
  },
};
