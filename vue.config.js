module.exports = {
	productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8018',
				changeOrigin: true,
			},
			'/uploads': {
				target: 'http://127.0.0.1:8018',
				changeOrigin: true,
			},
			'/statics': {
				target: 'http://127.0.0.1:8018',
				changeOrigin: true,
			},
		},
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
			config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
			config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
		}
	}
}
