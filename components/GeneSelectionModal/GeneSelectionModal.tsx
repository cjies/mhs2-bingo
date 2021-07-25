import { Button, Modal, Tabs } from 'antd';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ATTACK_TYPE } from '@/constants/attackType';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR } from '@/constants/common';
import { GENE_TYPE } from '@/constants/gene';
import { Maybe } from '@/interfaces/common';
import { Gene as IGene, GeneId } from '@/interfaces/gene';

import { ALL_TYPE, TABS } from './constants';
import GeneTabPane from './GeneTabPane';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${PRIMARY_BACKGROUND_COLOR};
  }

  .ant-modal-footer {
    border-top: 0;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav::before {
    display: none;
  }

  .ant-tabs-tab.ant-tabs-tab.ant-tabs-tab {
    border: 0;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);

    &.ant-tabs-tab-active {
      background-color: ${PRIMARY_COLOR};

      .ant-tabs-tab-btn {
        color: #fff;
      }
    }

    & + .ant-tabs-tab {
      margin-left: 0.5rem;
    }
  }
`;

interface Props {
  visible: boolean;
  genes: IGene[];
  selectedGene: Maybe<IGene>;
  invalidGeneIds: GeneId[];
  onApply: (gene: Maybe<IGene>) => void;
  onCancel: () => void;
}

const GeneSelectionModal: FC<Props> = ({
  genes,
  selectedGene,
  invalidGeneIds,
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

  // Reset internal states
  useEffect(() => {
    if (visible) {
      setToBeSelectedGene(selectedGene);
      if (!selectedGene) {
        setTabKey(ALL_TYPE);
      }
    }
  }, [visible, selectedGene]);

  // -------------------------------------
  //   Handlers
  // -------------------------------------

  const handleModalReset = useCallback(() => {
    onApply(null);
  }, [onApply]);

  const handleModalApply = useCallback(() => {
    onApply(toBeSelectedGene);
  }, [toBeSelectedGene, onApply]);

  // -------------------------------------
  //   Render
  // -------------------------------------

  const modalFooter = useMemo(() => {
    const buttons = [
      <Button key="cancel" size="large" onClick={onCancel}>
        取消
      </Button>,
      <Button
        key="apply"
        type="primary"
        size="large"
        onClick={handleModalApply}
      >
        確定
      </Button>,
    ];

    // append reset button
    if (selectedGene) {
      buttons.unshift(
        <Button
          key="reset"
          danger
          type="primary"
          size="large"
          onClick={handleModalReset}
        >
          重設此基因
        </Button>
      );
    }

    return buttons;
  }, [selectedGene, handleModalReset, handleModalApply, onCancel]);

  return (
    <StyledModal
      visible={visible}
      width={1024}
      closable={false}
      destroyOnClose
      footer={modalFooter}
      onOk={handleModalApply}
      onCancel={onCancel}
    >
      <StyledTabs type="card" activeKey={tabKey} onChange={setTabKey}>
        {TABS.map((tab) => (
          <Tabs.TabPane key={tab.key} tab={tab.label}>
            <GeneTabPane
              searchPlaceholder={tab.searchPlaceholder ?? ''}
              genes={filteredGenes}
              selectedGene={selectedGene}
              toBeSelectedGene={toBeSelectedGene}
              invalidGeneIds={invalidGeneIds}
              onGeneClick={setToBeSelectedGene}
            />
          </Tabs.TabPane>
        ))}
      </StyledTabs>
    </StyledModal>
  );
};

export default memo(GeneSelectionModal);
