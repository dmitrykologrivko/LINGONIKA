export default () => {
  return {
    secretKey: process.env.SECRET_KEY,
    databases: {
      default: {
        type: 'postgres',
        synchronize: false,
        database: process.env.POSTGRES_DB || 'lingonika',
        host: process.env.POSTGRES_HOST || 'localhost',
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        port: process.env.POSTGRES_PORT || 5432,
      },
    },
  };
};
