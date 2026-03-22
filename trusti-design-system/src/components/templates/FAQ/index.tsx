import React from 'react';
import { Accordion, type AccordionItem } from '../../organisms/Accordion';
import styles from './styles.module.css';

/* Figma: ❖ FAQ — page 3046:9774, section 3046:9779 */

export interface FAQItem { question: string; answer: React.ReactNode; }

export interface FAQProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({ title = 'Frequently Asked Questions', items, className = '' }) => {
  const accordionItems: AccordionItem[] = items.map((item, i) => ({
    id: `faq-${i}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section className={`${styles.section} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <Accordion items={accordionItems} />
    </section>
  );
};
