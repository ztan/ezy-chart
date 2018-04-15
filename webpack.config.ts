import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as OfflinePlugin from 'offline-plugin';

export default (environment = 'development') => {
	const { ifProduction, ifDevelopment } = getIfUtils(environment);

	return {
		devtool: ifProduction('source-map', 'eval'),
		entry: path.join(__dirname, 'demo', 'entry.ts'),
		output: {
			filename: ifProduction('[name]-[chunkhash].js', '[name].js')
		},
		module: {
			rules: removeEmpty([
				ifDevelopment({
					test: /\.ts$/,
					use: ['tslint-loader'],
					exclude: /node_modules/,
					enforce: 'pre'
				}),
				{
					test: /\.html$/,
					use: ['html-loader']
				},
				{
					test: /\.ts$/,
					use: ['@ngtools/webpack']
				}
			])
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		devServer: {
			port: 8000,
			inline: true,
			hot: true,
			historyApiFallback: true,
			overlay: true
		},
		plugins: removeEmpty([
			ifProduction(new webpack.optimize.ModuleConcatenationPlugin()),
			ifProduction(
				new AngularCompilerPlugin({
					tsConfigPath: './tsconfig-demo.json',
					sourceMap: true
				}),
				new AngularCompilerPlugin({
					tsConfigPath: './tsconfig.json',
					skipCodeGeneration: true,
					sourceMap: true
				})
			),
			new webpack.ProvidePlugin({
				'echarts': 'echarts',
				'Chart': 'chart.js'
			}),
			ifDevelopment(new webpack.HotModuleReplacementPlugin()),
			new webpack.DefinePlugin({
				ENV: JSON.stringify(environment)
			}),
			ifProduction(
				new webpack.optimize.UglifyJsPlugin({
					sourceMap: true
				})
			),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'demo', 'index.ejs')
			}),
			ifProduction(new OfflinePlugin())
		])
	};
};
