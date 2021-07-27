import { Drawer, Grid, Table } from 'antd';
import Image from 'next/image';
import { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_DARK_ICON } from '@/constants/attackType';
import { PRIMARY_BACKGROUND_COLOR } from '@/constants/common';
import { GENE_TYPE, GENE_TYPE_ICON } from '@/constants/gene';
import { GeneTable } from '@/interfaces/gene';
import {
  matchDiagonalGenes,
  matchHorizontalGenes,
  matchVerticalGenes,
} from '@/utils/matchers';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-header,
  .ant-drawer-content {
    background-color: ${PRIMARY_BACKGROUND_COLOR};
  }

  .ant-drawer-header {
    border: 0;
    padding-bottom: 0;
  }
`;

const StyledTable = styled(Table)`
  .ant-table {
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(181, 162, 139, 0.8);
  }
  .ant-table-cell {
    padding: 0.75rem 1rem;
    background-color: transparent;
    border-bottom-color: rgba(181, 162, 139, 0.8);
  }

  .ant-table-row:last-child .ant-table-cell {
    border-bottom: 0;
  }
`;

const Label = styled.div`
  display: inline-flex;
  align-items: center;
`;

const LabelText = styled.span`
  margin-left: 0.25rem;
`;

const GENE_TYPE_ROWS = [
  { type: GENE_TYPE.NORMAL, label: '無屬性賓果加成' },
  { type: GENE_TYPE.FIRE, label: '火屬性賓果加成' },
  { type: GENE_TYPE.WATER, label: '水屬性賓果加成' },
  { type: GENE_TYPE.THUNDER, label: '雷屬性賓果加成' },
  { type: GENE_TYPE.ICE, label: '冰屬性賓果加成' },
  { type: GENE_TYPE.DRAGON, label: '龍屬性賓果加成' },
];
const ATTACK_TYPE_ROWS = [
  { type: ATTACK_TYPE.POWER, label: '力量賓果加成' },
  { type: ATTACK_TYPE.SPEED, label: '速度賓果加成' },
  { type: ATTACK_TYPE.SKILL, label: '技巧賓果加成' },
];

interface Props {
  visible: boolean;
  geneTable: GeneTable;
  onClose: () => void;
}

const BingoTableDrawer: FC<Props> = ({ visible, geneTable, onClose }) => {
  const screens = Grid.useBreakpoint();

  const columns = useMemo(
    () => [
      {
        title: '賓果加成類型',
        dataIndex: 'label',
        key: 'label',
      },
      {
        title: '賓果加成數',
        dataIndex: 'matchCount',
        key: 'matchCount',
      },
      {
        title: '傷害倍率',
        dataIndex: 'percentage',
        key: 'percentage',
      },
    ],
    []
  );

  const dataSource = useMemo(() => {
    const horizontalResult = matchHorizontalGenes(geneTable);
    const verticalResult = matchVerticalGenes(geneTable);
    const diagonalResult = matchDiagonalGenes(geneTable);
    const bingoResults = [
      ...Object.values(horizontalResult),
      ...Object.values(verticalResult),
      ...Object.values(diagonalResult),
    ];

    const geneTypeRows = GENE_TYPE_ROWS.map(({ type, label }) => {
      const icon = type !== GENE_TYPE.RAINBOW ? GENE_TYPE_ICON[type] : null;

      const matchResult = bingoResults.filter(({ geneType }) => {
        if (type in GENE_TYPE && geneType) {
          return type === geneType;
        }
        return false;
      });
      const percentage = matchResult.reduce((acc, _, index) => {
        // first two * 10%, rest * 5%
        const accumulatedRate = index > 1 ? 5 : 10;
        return acc + accumulatedRate;
      }, 100);

      return {
        label: (
          <Label>
            {icon && <Image src={icon} width={16} height={16} alt="icon" />}
            <LabelText>{label}</LabelText>
          </Label>
        ),
        matchCount: `x ${matchResult.length}`,
        percentage: `${percentage} %`,
      };
    });

    const attackTypeRows = ATTACK_TYPE_ROWS.map(({ type, label }) => {
      const icon =
        type !== ATTACK_TYPE.RAINBOW ? ATTACK_TYPE_DARK_ICON[type] : null;

      const matchResult = bingoResults.filter(({ attackType }) => {
        if (type in ATTACK_TYPE && attackType) {
          return type === attackType;
        }
        return false;
      });
      const percentage = matchResult.reduce((acc, _, index) => {
        // first two * 10%, rest * 5%
        const accumulatedRate = index > 1 ? 5 : 10;
        return acc + accumulatedRate;
      }, 100);

      return {
        label: (
          <Label>
            {icon && <Image src={icon} width={16} height={16} alt="icon" />}
            <LabelText>{label}</LabelText>
          </Label>
        ),
        matchCount: `x ${matchResult.length}`,
        percentage: `${percentage} %`,
      };
    });

    return [...geneTypeRows, ...attackTypeRows];
  }, [geneTable]);

  return (
    <StyledDrawer
      visible={visible}
      placement="right"
      title="賓果加成"
      width={screens.xs ? '80%' : '60%'}
      closable={false}
      onClose={onClose}
    >
      <StyledTable
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </StyledDrawer>
  );
};

export default memo(BingoTableDrawer);
