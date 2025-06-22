import React, { useState } from "react";
import styles from "./LinkForm.module.css";

interface Link {
  title: string;
  url: string;
  tags?: string;
  notes?: string;
}

interface LinkFormProps {
  onAdd: (link: Link) => void;
}

export default function LinkForm({ onAdd }: LinkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch("http://localhost:5000/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, url, tags, notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add link");
      onAdd(data.link || { title, url, tags, notes });
      setTitle("");
      setUrl("");
      setTags("");
      setNotes("");
    } catch (err: any) {
      setError(err.message || "Failed to add link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off" aria-label="Add Link Form">
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles["form-group"]}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          id="title"
          className={styles.input}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="url" className={styles.label}>URL</label>
        <input
          id="url"
          className={styles.input}
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="tags" className={styles.label}>Tags <span style={{color:'#888',fontWeight:400}}>(comma separated)</span></label>
        <input
          id="tags"
          className={styles.input}
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="notes" className={styles.label}>Notes</label>
        <textarea
          id="notes"
          className={styles.textarea}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={2}
        />
      </div>
      <button type="submit" className={styles["submit-button"]} disabled={loading}>
        {loading ? "Adding..." : "Add Link"}
      </button>
    </form>
  );
}
