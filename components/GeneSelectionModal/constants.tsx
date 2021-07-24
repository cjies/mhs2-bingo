import Image from 'next/image';

import { ATTACK_TYPE, ATTACK_TYPE_ICON } from '@/constants/attackType';
import { GENE_TYPE, GENE_TYPE_ICON } from '@/constants/gene';

export const ALL_TYPE = 'ALL';

export const TABS = [
  { key: ALL_TYPE, label: '全部' },
  {
    key: GENE_TYPE.NORMAL,
    label: (
      <Image
        src={GENE_TYPE_ICON[GENE_TYPE.NORMAL]}
        width={20}
        height={20}
        alt="無屬性"
      />
    ),
  },
  {
    key: GENE_TYPE.FIRE,
    label: (
      <Image
        src={GENE_TYPE_ICON[GENE_TYPE.FIRE]}
        width={20}
        height={20}
        alt="火屬性"
      />
    ),
  },
  {
    key: GENE_TYPE.WATER,
    label: (
      <Image
        src={GENE_TYPE_ICON[GENE_TYPE.WATER]}
        width={20}
        height={20}
        alt="無屬性"
      />
    ),
  },
  {
    key: GENE_TYPE.THUNDER,
    label: (
      <Image
        src={GENE_TYPE_ICON[GENE_TYPE.THUNDER]}
        width={20}
        height={20}
        alt="雷屬性"
      />
    ),
  },
  {
    key: GENE_TYPE.ICE,
    label: (
      <Image
        src={GENE_TYPE_ICON[GENE_TYPE.ICE]}
        width={20}
        height={20}
        alt="冰屬性"
      />
    ),
  },
  {
    key: GENE_TYPE.DRAGON,
    label: (
      <Image
        src={GENE_TYPE_ICON[GENE_TYPE.DRAGON]}
        width={20}
        height={20}
        alt="龍屬性"
      />
    ),
  },
  {
    key: ATTACK_TYPE.POWER,
    label: (
      <Image
        src={ATTACK_TYPE_ICON[ATTACK_TYPE.POWER]}
        width={20}
        height={20}
        alt="力量"
      />
    ),
  },
  {
    key: ATTACK_TYPE.SPEED,
    label: (
      <Image
        src={ATTACK_TYPE_ICON[ATTACK_TYPE.SPEED]}
        width={20}
        height={20}
        alt="速度"
      />
    ),
  },
  {
    key: ATTACK_TYPE.SKILL,
    label: (
      <Image
        src={ATTACK_TYPE_ICON[ATTACK_TYPE.SKILL]}
        width={20}
        height={20}
        alt="技巧"
      />
    ),
  },
];
