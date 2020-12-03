/* eslint-disable @typescript-eslint/no-var-requires */
const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  trailingSlash: true,

  webpack: (config) => {
    return config;
  },

  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },
};
