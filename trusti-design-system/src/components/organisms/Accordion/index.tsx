import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Accordion — page 624:17, node 648:1547 */

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          open={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
};

const AccordionPanel: React.FC<{
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
}> = ({ item, open, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, [open, item.content]);

  return (
    <div className={`${styles.panel} ${open ? styles.open : ''}`}>
      <div className={styles.topBorder} />
      <button
        className={styles.trigger}
        onClick={onToggle}
        disabled={item.disabled}
        aria-expanded={open}
        aria-controls={`accordion-content-${item.id}`}
        type="button"
      >
        <span className={styles.title}>{item.title}</span>
        <i
          className={`fa-regular fa-chevron-down ${styles.chevron}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`accordion-content-${item.id}`}
        className={styles.content}
        role="region"
        style={{ maxHeight: open ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className={styles.inner}>
          {item.content}
        </div>
      </div>
    </div>
  );
};
