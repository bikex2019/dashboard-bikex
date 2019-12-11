module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://backend-bikex.herokuapp.com',
          ws: true,
          changeOrigin: true
        }
      },
      proxy:"https://www.karnatakaone.gov.in/"
    }
  }