import { db } from '@main/db';
import { Configuration } from '@common/entity/Configuration.entity';

export async function setConfiguration(key: string, value: string) {
  const configurationRepository = db.getRepository(Configuration);
  const createdConfig = new Configuration();
  createdConfig.key = key;
  createdConfig.value = value;
  await configurationRepository.save(createdConfig);
  return createdConfig;
}

export async function getConfiguration(key: string) {
  const configurationRepository = db.getRepository(Configuration);
  const config = await configurationRepository.findOne({
    where: {
      key,
    },
  });
  return config;
}
