"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import Toast from "../components/Toast";
import { fetchWithAuth } from "../utils/auth";

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
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    fetchWithAuth(`${backendUrl}/api/links`, { method: "GET" }, () => {
      router.push("/");
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
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const res = await fetchWithAuth(`${backendUrl}/api/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      }, () => {
        router.push("/");
      });

      const data = await res.json();
      if (res.ok) {
        // If backend returns the new link object, use it. Otherwise, refetch all links.
        if (data && data.id) {
          setLinks([...links, {
            ...newLink,
            id: data.id,
            created_at: data.created_at || new Date().toISOString()
          }]);
        } else {
          // fallback: refetch all links
          const token = localStorage.getItem("token");
          if (token) {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
            fetchWithAuth(`${backendUrl}/api/links`, { method: "GET" }, () => {
              router.push("/");
            })
              .then(res => res.json())
              .then(data => Array.isArray(data) && setLinks(data));
          }
        }
        setTitle("");
        setUrl("");
        setTags("");
        setNotes("");
        setToast({ message: "Link added successfully!", type: "success" });
      } else {
        setToast({ message: data.message || "Failed to add link", type: "error" });
        console.error("Add link error:", data);
      }
    } catch (err) {
      setToast({ message: "Failed to add link", type: "error" });
      console.error("Failed to add link:", err);
    }
  };

  const handleDeleteLink = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const res = await fetchWithAuth(`${backendUrl}/api/links/${id}`, {
        method: "DELETE"
      }, () => {
        router.push("/");
      });
  
      if (res.ok) {
        setLinks(links.filter(link => link.id !== id));
        setToast({ message: "Link deleted.", type: "success" });
      } else {
        const data = await res.json();
        setToast({ message: data.message || "Failed to delete link", type: "error" });
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      setToast({ message: "Failed to delete link", type: "error" });
      console.error("Delete error:", err);
    }
  };

  // Tag list for filter dropdown
  const tagsList = useMemo(() => {
    const tagSet = new Set<string>();
    links.forEach(link => {
      link.tags?.split(",").map(t => t.trim()).filter(Boolean).forEach(t => tagSet.add(t));
    });
    return Array.from(tagSet).sort();
  }, [links]);

  // Sort links by created_at (newest first)
  const sortedLinks = useMemo(() => {
    return [...links].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [links]);

  // Filtered links based on search and tag
  const filteredLinks = useMemo(() => {
    return sortedLinks.filter(link => {
      const matchesTag = tagFilter ? link.tags?.split(",").map(t => t.trim()).includes(tagFilter) : true;
      const matchesSearch = search ?
        (link.title?.toLowerCase().includes(search.toLowerCase()) ||
         link.url?.toLowerCase().includes(search.toLowerCase()) ||
         link.notes?.toLowerCase().includes(search.toLowerCase())) : true;
      return matchesTag && matchesSearch;
    });
  }, [sortedLinks, tagFilter, search]);

  // Pagination
  const [page, setPage] = useState(1);
  const linksPerPage = 5;
  const totalPages = Math.ceil(filteredLinks.length / linksPerPage);
  const paginatedLinks = filteredLinks.slice((page - 1) * linksPerPage, page * linksPerPage);

  // Reset page when filter/search changes
  React.useEffect(() => { setPage(1); }, [search, tagFilter, links]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.headerBar}>
        <h1 className={styles["dashboard-title"]}>Linker Dashboard</h1>
        <div className={styles.logoutTooltipWrapper}>
          <button
            className={styles.logoutButton}
            onClick={() => {
              (async () => {
                await fetch("http://localhost:5000/api/logout", {
                  method: "POST",
                  credentials: "include"
                });
                localStorage.removeItem("token");
                router.push("/");
              })();
            }}
            aria-label="Logout"
          >
            {/* Modern logout icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
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
          <div className={styles["search-filter-bar"]}>
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search by title, url, notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className={styles.filterSelect}
              value={tagFilter}
              onChange={e => setTagFilter(e.target.value)}
            >
              <option value="">All Tags</option>
              {tagsList.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          {paginatedLinks.length === 0 ? (
            <p className={styles.empty}>No links found.</p>
          ) : (
            <ul className={styles["links-list"]}>
              {paginatedLinks.map((link, idx) => (
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
                      {/* Modern grey trash icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* Pagination controls */}
          {totalPages > 1 && (
  <div className={styles.pagination}>
    <button
      className={styles.pageBtn}
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      aria-label="Previous page"
    >
      &#8592; Prev
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        className={styles.pageBtn + (page === i + 1 ? ' ' + styles.active : '')}
        onClick={() => setPage(i + 1)}
        disabled={page === i + 1}
        aria-current={page === i + 1 ? "page" : undefined}
        aria-label={`Page ${i + 1}`}
      >
        {i + 1}
      </button>
    ))}
    <button
      className={styles.pageBtn}
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
      aria-label="Next page"
    >
      Next &#8594;
    </button>
  </div>
)}
        </section>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
