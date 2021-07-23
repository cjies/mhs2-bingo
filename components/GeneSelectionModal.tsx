import { Button, List, Modal, Tabs } from 'antd';
import avatar from 'antd/lib/avatar';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled, { css } from 'styled-components';

import { ATTACK_TYPE } from '../constants/attackType';
import { GENE_TYPE } from '../constants/gene';
import { Maybe } from '../interfaces/common';
import { Gene as IGene } from '../interfaces/gene';
import Gene from './Gene';

const StyledListItem = styled(List.Item)<{ $selected: boolean }>`
  ${(props) =>
    props.$selected &&
    css`
      border: 1px solid black;
    `}
`;

const ALL_TYPE = 'ALL';
const TABS = [
  { key: ALL_TYPE, label: '全部' },
  { key: GENE_TYPE.NORMAL, label: '無屬性' },
  { key: GENE_TYPE.FIRE, label: '火屬性' },
  { key: GENE_TYPE.WATER, label: '水屬性' },
  { key: GENE_TYPE.THUNDER, label: '雷屬性' },
  { key: GENE_TYPE.ICE, label: '冰屬性' },
  { key: GENE_TYPE.DRAGON, label: '龍屬性' },
  { key: ATTACK_TYPE.POWER, label: '力量' },
  { key: ATTACK_TYPE.SPEED, label: '速度' },
  { key: ATTACK_TYPE.SKILL, label: '技巧' },
];

interface Props {
  visible: boolean;
  genes: IGene[];
  selectedGene: Maybe<IGene>;
  onApply: (gene: Maybe<IGene>) => void;
  onCancel: () => void;
}

const GeneSelectionModal: FC<Props> = ({
  genes,
  selectedGene,
  visible,
  onApply,
  onCancel,
}) => {
  const [toBeSelectedGene, setToBeSelectedGene] = useState(selectedGene);
  const [tabKey, setTabKey] = useState(ALL_TYPE);

  const filteredGenes = useMemo(() => {
    if (tabKey === ALL_TYPE) {
      return genes;
    }

    return genes.filter((gene) => {
      if (tabKey in GENE_TYPE) {
        return gene.type === tabKey;
      }
      if (tabKey in ATTACK_TYPE) {
        return gene.attackType === tabKey;
      }
      return true;
    });
  }, [genes, tabKey]);

  // update internal state
  useEffect(() => {
    if (visible) {
      setToBeSelectedGene(selectedGene);
    }
  }, [visible, selectedGene]);

  // -------------------------------------
  //   Handlers
  // -------------------------------------

  const handleModalApply = useCallback(() => {
    onApply(toBeSelectedGene);
  }, [toBeSelectedGene, onApply]);

  const handleModalReset = useCallback(() => {
    onApply(null);
  }, [onApply]);

  // -------------------------------------
  //   Render
  // -------------------------------------

  return (
    <Modal
      visible={visible}
      width="80%"
      footer={[
        <Button key="reset" type="ghost" onClick={handleModalReset}>
          重設
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="apply" type="primary" onClick={handleModalApply}>
          確定
        </Button>,
      ]}
      onOk={handleModalApply}
      onCancel={onCancel}
    >
      <Tabs type="card" activeKey={tabKey} onChange={setTabKey}>
        {TABS.map((tab) => (
          <Tabs.TabPane key={tab.key} tab={tab.label}>
            <List
              dataSource={filteredGenes}
              grid={{ gutter: 8, column: 2, xs: 1 }}
              pagination={{ pageSize: 8, showSizeChanger: false }}
              renderItem={(gene) => {
                const isSelected = toBeSelectedGene?.id === gene.id;
                const handleItemClick = () => {
                  setToBeSelectedGene(isSelected ? null : gene);
                };

                return (
                  <StyledListItem
                    key={gene.id}
                    $selected={isSelected}
                    onClick={handleItemClick}
                  >
                    <List.Item.Meta
                      avatar={
                        <Gene
                          id={gene.id}
                          size={3}
                          geneType={gene.type}
                          attackType={gene.attackType}
                        />
                      }
                      title={gene.name}
                      description={
                        <div>
                          <div>{`${gene.skillType}: ${gene.skillName}`}</div>
                          <div>{gene.skillDescription}</div>
                          <div>{`必要等級: ${gene.minLevel}`}</div>
                          <div>{`消耗羈絆值: ${
                            gene.sp ? `${gene.sp} / 100` : '--'
                          }`}</div>
                          <div>{`可持有隨行獸: ${gene.monsters.join(
                            ', '
                          )}`}</div>
                        </div>
                      }
                    />
                  </StyledListItem>
                );
              }}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default memo(GeneSelectionModal);
