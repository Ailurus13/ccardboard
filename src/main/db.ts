import { DataSource } from 'typeorm';
import { Configuration } from '@common/entity/Configuration.entity';
import { Movie } from '@common/entity/Movie.entity';
import { Seance } from '@common/entity/Seance.entity';

export const db = new DataSource({
  type: 'better-sqlite3',
  database: 'ccardboard.db',
  entities: [Movie, Configuration, Seance],
  synchronize: true,
  logging: true,
});
