import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
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
				ifDevelopment(
					{
						test: /\.ts$/,
						use: [{
							loader: 'ts-loader',
							options: {
								transpileOnly: true
							}
						}, 'angular2-template-loader'],
						exclude: /node_modules/,
					},
					{
						test: /\.ts$/,
						use: ['@ngtools/webpack']
					}
				)
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
					tsConfigPath: './tsconfig-demo.json'
				})
			),
			ifDevelopment(new webpack.HotModuleReplacementPlugin()),
			ifDevelopment(
				new ForkTsCheckerWebpackPlugin({
					watch: ['./src', './demo'],
					formatter: 'codeframe'
				})
			),
			new webpack.DefinePlugin({
				ENV: JSON.stringify(environment)
			}),
			ifProduction(
				new webpack.optimize.UglifyJsPlugin({
					sourceMap: true
				})
			),
			new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)/, path.join(__dirname, 'src')),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'demo', 'index.ejs')
			}),
			ifProduction(new OfflinePlugin())
		])
	};
};
