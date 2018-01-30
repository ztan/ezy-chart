import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as angularExternals from 'webpack-angular-externals';
import * as rxjsExternals from 'webpack-rxjs-externals';
import { AngularCompilerPlugin } from '@ngtools/webpack';

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());

export default {
	entry: {
		'ezy-chart.umd': path.join(__dirname, 'src', 'index.ts'),
		'ezy-chart.umd.min': path.join(__dirname, 'src', 'index.ts')
	},
	output: {
		path: path.join(__dirname, 'dist', 'bundles'),
		filename: '[name].js',
		libraryTarget: 'umd',
		library: 'angularToolsCharts'
	},
	externals: [angularExternals(), rxjsExternals()],
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'tslint-loader',
				exclude: /node_modules/,
				enforce: 'pre',
				options: {
					emitErrors: true,
					failOnHint: true
				}
			},
			{
				test: /\.ts$/,
				use: ['@ngtools/webpack'],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new AngularCompilerPlugin({
			tsConfigPath: './tsconfig.json',
			skipCodeGeneration: true,
			sourceMap: true
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			sourceMap: true
		}),
		new webpack.BannerPlugin({
			banner: `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
      `.trim(),
			raw: true,
			entryOnly: true
		})
	]
};
