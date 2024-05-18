const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
        '/product': {
            target: 'http://localhost:8081',
            changeOrigin: true
        }
    }
}
  

})
