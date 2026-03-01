import { useState, useRef } from "react";
import styles from "./FAQAccordion.module.css";

export default function FAQAccordion({ faqs = [], title }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.wrapper}>
      {title && <h2 className={styles.heading}>{title}</h2>}

      <div className={styles.container}>
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={activeIndex === index}
            onClick={() => toggle(index)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onClick, index }) {
  const contentRef = useRef(null);

  return (
    <div className={`${styles.item} ${isOpen ? styles.active : ""}`}>
      <button
        className={styles.question}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
        id={`faq-header-${index}`}
      >
        <span>{faq.question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}>
          ▾
        </span>
      </button>

      <div
        ref={contentRef}
        id={`faq-content-${index}`}
        role="region"
        aria-labelledby={`faq-header-${index}`}
        className={styles.answer}
        style={{
          maxHeight: isOpen
            ? contentRef.current?.scrollHeight + "px"
            : "0px"
        }}
      >
        <div className={styles.answerInner}>{faq.answer}</div>
      </div>
    </div>
  );
}