import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const isProd = !isDev;

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),

        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),
    ];

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        );
        plugins.push(
            new CopyPlugin({
                patterns: [
                    { from: paths.locales, to: paths.buildLocales },
                    { from: paths.img, to: paths.buildImg },
                ],
            })
        );
    }

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
            })
        );
        plugins.push(
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                    mode: 'write-references',
                },
            })
        );
    }

    return plugins;
}