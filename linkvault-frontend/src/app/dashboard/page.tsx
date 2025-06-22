"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

interface Link {
  title: string;
  url: string;
  tags: string;
  notes: string;
}

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      }
    }
  }, [router]);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;
    setLinks([
      ...links,
      { title, url, tags, notes }
    ]);
    setTitle("");
    setUrl("");
    setTags("");
    setNotes("");
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles["dashboard-title"]}>Welcome to Your Dashboard!</h1>
      <div className={styles.sections}>
        <section className={styles["form-section"]}>
          <h2>Add a New Link</h2>
          <form className={styles.form} onSubmit={handleAddLink}>
            <input
              className={styles.input}
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="url"
              placeholder="URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
            <textarea
              className={styles.input}
              placeholder="Notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
            />
            <button className={styles.button} type="submit">Add Link</button>
          </form>
        </section>
        <section className={styles["links-section"]}>
          <h2>Saved Links</h2>
          {links.length === 0 ? (
            <p className={styles.empty}>No links added yet.</p>
          ) : (
            <ul className={styles["links-list"]}>
              {links.map((link, idx) => (
                <li key={idx} className={styles["link-card"]}>
                  <div className={styles["link-title"]}>{link.title}</div>
                  <div className={styles["link-url"]}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></div>
                  {link.tags && <div className={styles["link-tags"]}>Tags: {link.tags}</div>}
                  {link.notes && <div className={styles["link-notes"]}>Notes: {link.notes}</div>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
