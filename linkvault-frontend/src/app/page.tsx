// import styles from "./page.module.css";

// export default function LandingPage() {
//   return (
//     <>
//       <main>
//         <section className={styles.hero}>
//           <h1>LinkVault</h1>
//           <p className={styles.tagline}>
//             Your personal vault for saving, organizing, and accessing useful links.
//           </p>
//           <a href="/signup" className={styles.cta}>
//             Get Started
//           </a>
//         </section>
//         <section className={styles.features}>
//           <div className={styles["feature-card"]}>
//             <h2>Save important links instantly</h2>
//             <p>Quickly add links you want to keep safe and handy.</p>
//           </div>
//           <div className={styles["feature-card"]}>
//             <h2>Add tags and notes for context</h2>
//             <p>Organize your links with tags and personal notes for easy recall.</p>
//           </div>
//           <div className={styles["feature-card"]}>
//             <h2>Access everything in one dashboard</h2>
//             <p>Find all your saved links in a clean, unified dashboard anytime.</p>
//           </div>
//         </section>
//       </main>
//       <footer className={styles.footer}>
//         &copy; {new Date().getFullYear()} LinkVault. All rights reserved.
//       </footer>
//     </>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import styles from "./page.module.css";

export default function LandingPage() {
  const [backendMessage, setBackendMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Backend not reachable"));
  }, []);

  return (
    <>
      <main>
        <section className={styles.hero}>
          <h1>LinkVault</h1>
          <p className={styles.tagline}>
            Your personal vault for saving, organizing, and accessing useful links.
          </p>
          <a href="/signup" className={styles.cta}>
            Get Started
          </a>
        </section>

        <section className={styles.features}>
          <div className={styles["feature-card"]}>
            <h2>Save important links instantly</h2>
            <p>Quickly add links you want to keep safe and handy.</p>
          </div>
          <div className={styles["feature-card"]}>
            <h2>Add tags and notes for context</h2>
            <p>Organize your links with tags and personal notes for easy recall.</p>
          </div>
          <div className={styles["feature-card"]}>
            <h2>Access everything in one dashboard</h2>
            <p>Find all your saved links in a clean, unified dashboard anytime.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} LinkVault. All rights reserved.
        <br />
        <strong>Backend Status:</strong> {backendMessage}
      </footer>
    </>
  );
}
