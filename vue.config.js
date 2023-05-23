module.exports = {
  devServer: {
    port: 8081,
  },
  chainWebpack: config => {
    config
      .plugin('html')
        .tap(args => {
          args[0].title = "PlentyFull";
            return args;
      })
  }
}