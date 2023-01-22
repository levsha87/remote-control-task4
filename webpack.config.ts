import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    server: './src/main.ts',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'build/',
            },
          },
        ],
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  target: 'node',
};

export default config;
