"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

interface Link {
  id: number;
  title: string;
  url: string;
  tags: string;
  notes: string;
  created_at: string;
}

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    fetch("http://localhost:5000/api/links", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLinks(data);
        } else {
          console.error("Invalid response from backend:", data);
        }
      })
      .catch(err => {
        console.error("Error fetching links:", err);
      });
  }, [router]);

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const newLink = { title, url, tags, notes };

    try {
      const res = await fetch("http://localhost:5000/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newLink),
      });

      const data = await res.json();
      if (res.ok) {
        // Add new link to UI immediately
        setLinks([...links, { ...newLink, id: Date.now(), created_at: new Date().toISOString() }]);
        setTitle("");
        setUrl("");
        setTags("");
        setNotes("");
      } else {
        console.error("Add link error:", data);
      }
    } catch (err) {
      console.error("Failed to add link:", err);
    }
  };

  const handleDeleteLink = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const res = await fetch(`http://localhost:5000/api/links/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.ok) {
        setLinks(links.filter(link => link.id !== id));
      } else {
        const data = await res.json();
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  

  return (
    <div className={styles.dashboard}>
      <header className={styles.headerBar}>
        <h1 className={styles["dashboard-title"]}>LinkVault Dashboard</h1>
        <div className={styles.logoutTooltipWrapper}>
          <button
            className={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
            aria-label="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle'}}>
              <path d="M12 2v10" />
              <circle cx="12" cy="18" r="4" />
            </svg>
          </button>
          <span className={styles.logoutTooltip}>Logout</span>
        </div>
      </header>

      <div className={styles.sections}>
        <section className={styles["form-section"]}>
          <h2>Add a New Link</h2>
          <form className={styles.form} onSubmit={handleAddLink}>
            <input className={styles.input} type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <input className={styles.input} type="url" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} required />
            <input className={styles.input} type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
            <textarea className={styles.input} placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} rows={2} />
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
                <li key={link.id || idx} className={styles["link-card"]}>
                  <div className={styles["link-title"]}>{link.title}</div>
                  <div className={styles["link-url"]}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                  </div>
                  {link.tags && <div className={styles["link-tags"]}>Tags: {link.tags}</div>}
                  {link.notes && <div className={styles["link-notes"]}>Notes: {link.notes}</div>}
                  <div className={styles["link-actions"]}>
                    <button
                      className={styles["delete-button"]}
                      onClick={() => handleDeleteLink(link.id)}
                      title="Delete this link"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              )
            )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
