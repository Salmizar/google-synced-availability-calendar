const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/cal/calendar.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'cal/calendar.js',
    globalObject: 'this',
    library: {
      name: 'calendar',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./public", to: "" },
        { from: "./src/data.js", to: "" },
        { from: "./src/cal/calendar.css", to: "cal/calendar.css" },
      ],
    }),
  ],

};