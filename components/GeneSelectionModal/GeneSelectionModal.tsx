import { Button, Input, Modal, Select, Space, Tabs } from 'antd';
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';

import { ATTACK_TYPE } from '@/constants/attackType';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR } from '@/constants/common';
import { GENE_TYPE } from '@/constants/gene';
import { ACTIVE_SKILL_TYPE, SKILL_TYPE } from '@/constants/skillType';
import { Maybe } from '@/interfaces/common';
import { Gene as IGene, GeneId } from '@/interfaces/gene';

import {
  ALL_TYPE,
  ATTACK_TYPE_OPTIONS,
  GENE_TYPE_OPTIONS,
  SKILL_TYPE_OPTIONS,
  TABS,
} from './constants';
import GeneList from './GeneList';

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

const SearchContainer = styled(Space)`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 0.5rem 1em 2rem;
`;

const SearchInput = styled(Input.Search)`
  width: 14rem;
`;

type TabKey = typeof ALL_TYPE | GENE_TYPE | ATTACK_TYPE;

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
  const [tabKey, setTabKey] = useState<TabKey>(ALL_TYPE);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGeneType, setFilteredGeneType] = useState<
    GENE_TYPE | typeof ALL_TYPE
  >(ALL_TYPE);
  const [filteredAttackType, setFilteredAttackType] = useState<
    ATTACK_TYPE | typeof ALL_TYPE
  >(ALL_TYPE);
  const [filteredSkillType, setFilteredSkillType] = useState<
    SKILL_TYPE | ACTIVE_SKILL_TYPE | typeof ALL_TYPE
  >(ALL_TYPE);

  const filteredGenesByTab = useMemo(() => {
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

  const filteredGenesBySelections = useMemo(() => {
    return filteredGenesByTab
      .filter((gene) => {
        if (filteredGeneType === ALL_TYPE) {
          return true;
        }
        return gene.type === filteredGeneType;
      })
      .filter((gene) => {
        if (filteredAttackType === ALL_TYPE) {
          return true;
        }
        return gene.attackType === filteredAttackType;
      })
      .filter((gene) => {
        if (filteredSkillType === ALL_TYPE) {
          return true;
        }

        if (filteredSkillType in ACTIVE_SKILL_TYPE) {
          return (
            gene.skillType === SKILL_TYPE.ACTIVE &&
            gene.activeSkillType === filteredSkillType
          );
        }

        return gene.skillType === filteredSkillType;
      });
  }, [
    filteredGenesByTab,
    filteredGeneType,
    filteredAttackType,
    filteredSkillType,
  ]);

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

  const handleSearchInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearchInputValue(target.value);
    },
    []
  );

  const handleSearch = useCallback((value: string) => {
    setSearchInputValue(value);
    setSearchQuery(value);
  }, []);

  const handleTabKeyChange = useCallback((tabKey: string) => {
    if (tabKey in GENE_TYPE) {
      setFilteredGeneType(ALL_TYPE);
    }
    if (tabKey in ATTACK_TYPE) {
      setFilteredAttackType(ALL_TYPE);
    }
    setTabKey(tabKey as TabKey);
  }, []);

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
      <StyledTabs type="card" activeKey={tabKey} onChange={handleTabKeyChange}>
        {TABS.map((tab) => (
          <Tabs.TabPane key={tab.key} tab={tab.label}>
            <SearchContainer>
              {!(tabKey in GENE_TYPE) && (
                <Select value={filteredGeneType} onChange={setFilteredGeneType}>
                  <Select.Option value={ALL_TYPE}>全部屬性</Select.Option>
                  {GENE_TYPE_OPTIONS.map((option) => (
                    <Select.Option
                      key={`gene-type-filter-${option.key}`}
                      value={option.key}
                    >
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
              {!(tabKey in ATTACK_TYPE) && (
                <Select
                  value={filteredAttackType}
                  onChange={setFilteredAttackType}
                >
                  <Select.Option value={ALL_TYPE}>力速技</Select.Option>
                  {ATTACK_TYPE_OPTIONS.map((option) => (
                    <Select.Option
                      key={`attack-type-filter-${option.key}`}
                      value={option.key}
                    >
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
              <Select value={filteredSkillType} onChange={setFilteredSkillType}>
                <Select.Option value={ALL_TYPE}>全部技能</Select.Option>
                {SKILL_TYPE_OPTIONS.map((option) => (
                  <Select.Option
                    key={`skill-type-filter-${option.key}`}
                    value={option.key}
                  >
                    {option.label}
                  </Select.Option>
                ))}
              </Select>

              <SearchInput
                allowClear
                enterButton="搜尋"
                placeholder={tab.searchPlaceholder ?? ''}
                value={searchInputValue}
                onChange={handleSearchInputChange}
                onSearch={handleSearch}
              />
            </SearchContainer>

            <GeneList
              genes={filteredGenesBySelections}
              selectedGene={selectedGene}
              toBeSelectedGene={toBeSelectedGene}
              invalidGeneIds={invalidGeneIds}
              searchQuery={searchQuery}
              onGeneClick={setToBeSelectedGene}
            />
          </Tabs.TabPane>
        ))}
      </StyledTabs>
    </StyledModal>
  );
};

export default memo(GeneSelectionModal);
