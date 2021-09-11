import type { NextApiRequest, NextApiResponse } from 'next';
import shortHash from 'shorthash2';

import { MONSTERS } from '@/constants/monster';
import { ApiResponseData } from '@/interfaces/api';
import { Gene } from '@/interfaces/gene';
import { Monster, MonsterId } from '@/interfaces/monster';

import fetchGenes from './fetchGenes';
import fetchLegacyGenesMap from './fetchLegacyGenesMap';

let genesCache: Gene[] = [];
let monstersCache: Monster[] = [];
let cacheCreatedTime = +new Date();
const CACHE_REVALIDATE_THRESHOLD = 600000; // 10 minutes

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  try {
    const currentTime = +new Date();
    const cacheTimeDiff = Math.abs(currentTime - cacheCreatedTime);

    // return local caches if valid
    if (
      genesCache.length > 0 &&
      monstersCache.length > 0 &&
      cacheTimeDiff < CACHE_REVALIDATE_THRESHOLD
    ) {
      res.status(200).json({ genes: genesCache, monsters: monstersCache });
      return;
    }

    const legacyGenesMap = await fetchLegacyGenesMap();
    const genes = await fetchGenes(legacyGenesMap);
    const monsters = MONSTERS.map(({ name, icon }) => {
      const monsterId = shortHash(name) as MonsterId;
      return { id: monsterId, name, icon };
    });

    // update caches and created time
    cacheCreatedTime = currentTime;
    genesCache = genes;
    monstersCache = monsters;

    res.status(200).json({ genes, monsters });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
