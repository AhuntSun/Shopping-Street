// 配置路径别名，这里导出的内容会和modules内的cli3相关配置进行合并
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // cli3中默认的别名为：'@': 'src';这样以后，找文件都会在src文件夹下找
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}