module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'Prefab',
      script: 'public/index.js',
      watch: ['public/index.js']
    }
  ]
};
