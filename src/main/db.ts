import { DataSource } from 'typeorm';
import { Movie } from '@common/entity/Movie.entity';
import { Configuration } from '@common/entity/Configuration.entity';

export const db = new DataSource({
  type: 'better-sqlite3',
  database: 'ccardboard.db',
  entities: [Movie, Configuration],
  synchronize: true,
  logging: true,
});
