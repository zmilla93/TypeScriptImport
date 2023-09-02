// Webpack configuration
// https://webpack.js.org/configuration/

const usingGithubPages = true;

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const outputDir = usingGithubPages ? 'docs' : 'dist';

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
// const stylesHandler = MiniCssExtractPlugin.loader;


const config = {
    entry: {
        'index': './src/index.ts',
        'game': './src/game.ts',
    },
    output: {
        filename: 'static/scripts/[name].js',
        path: path.resolve(__dirname, outputDir),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        host: 'localhost',
        hot: true,
        port: 8000,
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.png',
        }),
        // new MiniCssExtractPlugin({
        //     filename: 'static/css/[name].css', // Output directory and filename pattern
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                // use: [
                //     {
                //         loader: MiniCssExtractPlugin.loader,
                //         options: {
                //             publicPath: '../css/', // Adjust the path as needed
                //         },
                //     },
                //     'css-loader',
                // ],

                use: [stylesHandler, 'css-loader'],
                // options: {
                //     publicPath: '../css', // Adjust the path as needed
                // },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    // https://webpack.js.org/configuration/stats/
    stats: {
        preset: 'minimal',
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new MiniCssExtractPlugin({
            filename: 'static/css/[name].css', // Output directory and filename pattern
        }));

    } else {
        config.mode = 'development';
    }
    return config;
};
