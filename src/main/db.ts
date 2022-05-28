import { DataSource } from 'typeorm';
import { Movie } from '@common/entity/Movie.entity';

export const db = new DataSource({
  type: 'better-sqlite3',
  database: 'ccardboard.db',
  entities: [Movie],
  synchronize: true,
  logging: true,
});
