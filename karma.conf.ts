import * as webpack from 'webpack';
import * as WebpackKarmaDieHardPlugin from '@mattlewis92/webpack-karma-die-hard';
import { AngularCompilerPlugin } from '@ngtools/webpack';

export default (config: any) => {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: './',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],

		// list of files / patterns to load in the browser
		files: ['src/test.entry.ts'],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'src/test.entry.ts': ['webpack', 'sourcemap']
		},

		webpack: {
			mode: "development",
			resolve: {
				extensions: ['.ts', '.js']
			},
			module: {
				rules: [
					{
						test: /.html$/,
						use: ['html-loader']
					},
					{
						test: /\.ts$/,
						use: [
							{
								loader: 'tslint-loader',
								options: {
									emitErrors: config.singleRun,
									failOnHint: config.singleRun,
									configFile: './tslint-test.json'
								}
							}
						],
						exclude: /node_modules/,
						enforce: 'pre'
					},
					{
						test: /\.ts$/,
						use: ['@ngtools/webpack'],
						exclude: /node_modules/
					},
					{
						test: /src(\\|\/).+\.ts$/,
						exclude: /(node_modules|\.spec\.ts$)/,
						loader: 'istanbul-instrumenter-loader',
						enforce: 'post'
					},
					{
						test: /\.component\.css$/,
						exclude: /node_modules/,
						use: ['to-string-loader', 'css-loader']
					}
				]
			},
			plugins: [
				new webpack.SourceMapDevToolPlugin({
					filename: null,
					columns: false,
					test: /\.(ts|js)($|\?)/i
				}),
				new AngularCompilerPlugin({
					tsConfigPath: './tsconfig.json',
					skipCodeGeneration: true,
					sourceMap: true
				}),
				new webpack.ProvidePlugin({
					'echarts': 'echarts',
					'Chart': 'chart.js'
				}),
				...(config.singleRun ? [new WebpackKarmaDieHardPlugin(), new webpack.NoEmitOnErrorsPlugin()] : [])
			]
		},

		mochaReporter: {
			showDiff: true,
			output: 'autowatch'
		},

		coverageIstanbulReporter: {
			reports: ['text-summary', 'html', 'lcovonly'],
			fixWebpackSourcePaths: true
		},

		mime: {
			'text/x-typescript': ['ts']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha', 'coverage-istanbul'],

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeHeadless']
	});
};
