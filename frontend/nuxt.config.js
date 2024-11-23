// import path from 'path';
// import fs from 'fs';
import webpack from 'webpack';

import pkg from './package.json';

require('dotenv').config({path: `./environment/.env.${process.env.NODE_ENV}`, systemvars: true});

export default {
  ssr: true,
  telemetry: true,

  dir: {
    layouts: 'views/layouts',
    pages: 'views/pages'
  },

  head: {
    title: 'docker-frontend-develop',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8' },
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description},
      {name: 'format-detection', content: 'telephone=no'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  css: [
    '~static/css/bootstrap/bootstrap.min.css',
    '~static/css/app.css'
  ],

  plugins: [
    '~/plugins/vue-frag',
    '~/plugins/axios'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    ['@nuxtjs/dotenv', {filename: `./environment/.env.${process.env.NODE_ENV}`, systemvars: true}],
    '@nuxtjs/composition-api/module',
    '@nuxtjs/device'
  ],

  device: {
    refreshOnResize: true
  },

  modules: [
    'cookie-universal-nuxt',
    // 'nuxt-custom-headers',
    // '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    // 'nuxt-healthcheck'
  ],

  axios: {
    proxy: process.env.NODE_ENV === 'development'
  },

  proxy: {
    '/api/': {
      target: process.env.API_URL_BROWSER,
      changeOrigin: true,
      pathRewrite: {'^/api/': ''}
    }
  },

  publicRuntimeConfig: {
    timestamp: new Date().getTime(),

    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    API_URL_BROWSER: process.env.API_URL_BROWSER,
    EPOCH_CDN_HOST: process.env.EPOCH_CDN_HOST,
    EPOCH_CDN_PUBLIC_PATH: process.env.EPOCH_CDN_PUBLIC_PATH,
  },
  // privateRuntimeConfig: {
  //   // API_SECRET: process.env.API_SECRET
  // },

  build: {
    // publicPath: `${process.env.STATIC_CDN_HOST}/${process.env.CDN_PUBLIC_PATH}`,

    // filenames: {
    //   app: ({isDev, isModern}) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[name]${isModern ? '.modern' : ''}.js?v=[chunkhash]`,
    //   chunk: ({isDev, isModern}) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[name]${isModern ? '.modern' : ''}.js?v=[chunkhash]`,
    //   css: ({isDev}) => isDev ? '[name].css' : 'css/[name].css?v=[chunkhash]',
    //   img: ({isDev}) => isDev ? '[path][name].[ext]' : 'img/[name].[ext]?[contenthash:7]',
    //   font: ({isDev}) => isDev ? '[path][name].[ext]' : 'fonts/[name].[ext]?[contenthash:7]',
    //   video: ({isDev}) => isDev ? '[path][name].[ext]' : 'videos/[name].[ext]?[contenthash:7]'
    // },

    html: {
      minify: {
        removeComments: true
      }
    },

    postcss: false,

    extractCSS: true,

    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    // [D] 도커에서 npm run dev > localhost에 sse를 자동 호출 연결하는 중
    // GET http://localhost:38849/sse net::ERR_CONNECTION_REFUSED 오류 발생
    // loading/sse net::ERR_INCOMPLETE_CHUNKED_ENCODING 200을 실행하는 오류 해결
    loadingScreen: false,

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],

    // loaders: {
    //   vue: {
    //     compiler: require('vue-template-babel-compiler')
    //   }
    // },

    extend(config, {isDev, isClient}) {
      config.performance.maxAssetSize = 512000;

      if (isClient) {
        config.devtool = 'cheap-module-source-map';
      }
    }
  },

  server: {
    host: process.env.NUXT_HOST,
    port: process.env.NUXT_PORT || 3000,
  }
};
