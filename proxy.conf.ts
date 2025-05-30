const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/api/howell/ver10/device_service',
      '/video/',
      '/amap/',
      '/help/',
      '/electric-bike/',
    ],
    target: 'http://iebs.51hws.cn',
    changeOrigin: true,

    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  },
];

module.exports = PROXY_CONFIG;
