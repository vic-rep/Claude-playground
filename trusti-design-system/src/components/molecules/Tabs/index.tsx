import React, { useState } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Tabs — page 45:9, Tab node 514:5436, TabGroup node 514:5451 */

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveId,
  activeId,
  onChange,
  className = '',
}) => {
  const [internalActive, setInternalActive] = useState(
    defaultActiveId || tabs[0]?.id
  );
  const current = activeId ?? internalActive;

  const handleClick = (id: string) => {
    if (!activeId) setInternalActive(id);
    onChange?.(id);
  };

  return (
    <div className={`${styles.tabGroup} ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={current === tab.id}
          disabled={tab.disabled}
          className={`${styles.tab} ${current === tab.id ? styles.active : ''}`}
          onClick={() => handleClick(tab.id)}
          type="button"
        >
          {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
