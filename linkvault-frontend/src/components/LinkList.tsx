import React from "react";
import styles from "./LinkList.module.css";

export interface Link {
  title: string;
  url: string;
  tags?: string;
  notes?: string;
}

interface LinkListProps {
  links: Link[];
}

export default function LinkList({ links }: LinkListProps) {
  if (!links || links.length === 0) {
    return <div className={styles.empty}>No links to show.</div>;
  }
  return (
    <ul className={styles["link-list"]}>
      {links.map((link, idx) => (
        <li key={idx} className={styles["link-card"]}>
          <a
            href={link.url}
            className={styles["link-title"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.title || link.url}
          </a>
          {link.tags && (
            <div className={styles.tags}>
              {link.tags.split(",").map((tag, i) => (
                <span key={i} className={styles.tag}>{tag.trim()}</span>
              ))}
            </div>
          )}
          {link.notes && <div className={styles.notes}>{link.notes}</div>}
        </li>
      ))}
    </ul>
  );
}
