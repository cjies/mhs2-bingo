import type { NextApiRequest, NextApiResponse } from 'next';
import shortHash from 'shorthash2';

import { MONSTERS } from '@/constants/monster';
import { ApiResponseData } from '@/interfaces/api';
import { MonsterId } from '@/interfaces/monster';

import fetchGenes from './fetchGenes';
import fetchLegacyGenesMap from './fetchLegacyGenesMap';

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  try {
    const legacyGenesMap = await fetchLegacyGenesMap();
    const genes = await fetchGenes(legacyGenesMap);

    const monsters = MONSTERS.map(({ name, icon }) => {
      const monsterId = shortHash(name) as MonsterId;
      return { id: monsterId, name, icon };
    });

    res.status(200).json({ genes, monsters });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
