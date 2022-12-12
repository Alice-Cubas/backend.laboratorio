import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'connMongoDB',
  connector: 'mongodb',
  url: 'mongodb+srv://Alice-Cubas:Rakuzan04@cluster0.b6d2f5a.mongodb.net/Recipeasy',
  host: 'cluster0.b6d2f5a.mongodb.net',
  port: 27017,
  user: 'Alice-Cubas',
  password: 'Rakuzan04',
  database: 'Recipeasy',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConnMongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'connMongoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.connMongoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
