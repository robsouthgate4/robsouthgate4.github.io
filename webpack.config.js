const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = env => {

    console.log(env.NODE_ENV)

    return {
        entry: {
            app: './src/index.js'
        },
        devtool: env.NODE_ENV === 'production' ? '' : 'inline-source-map',
        devServer: {
            contentBase: './docs',
            hot: env.NODE_ENV === 'production' ? false : true
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Webgl Effect',
                template: 'src/index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProvidePlugin({
                'THREE': require.resolve('three')
            }),
            new webpack.DefinePlugin({
                "PRODUCTION": env.NODE_ENV == 'production'
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                  postcss: [
                    autoprefixer(),
                  ]
                }
            })
        ],
        mode: env.NODE_ENV === 'production' ? 'production' : 'development',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'docs/'),
            publicPath: env.NODE_ENV === 'production' ? '/assets/' : ''
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ]
                },
                {
                    test: /\.css$/,
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [require('autoprefixer')]
                    }
                },
                {
                    test: /\.(mp4|png|svg|jpg|gif|obj)$/,
                    loader: 'file-loader',
                    options: {
                        //useRelativePath: true
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(glsl|vs|fs|vert|frag)$/,
                    exclude: /node_modules/,
                    use: [
                        'raw-loader',
                        'glslify-loader'
                    ]
                }
            ]
        }
    }
    
};