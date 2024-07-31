module.exports = {
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 100,
    },
  },
  'users-permissions': {
    enabled: true,
    config: {
      jwtSecret: 'your-secret-key', // Reemplaza con una clave secreta segura
      jwt: {
        expiresIn: '7d', // Tiempo de expiración del token
      },
    },
  },
};
