// ormconfig.ts
export default {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_db_user',
    password: 'your_db_password',
    database: 'zomato_clone_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Use only in development
  };
  