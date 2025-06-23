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
import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";

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
      <Navbar />
      <main>
        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>LinkVault</h1>
            <p className={styles.tagline}>
              Your personal vault for saving, organizing, and accessing useful links.
            </p>
            <div style={{ margin: "28px 0" }}>
              <a href="/signup" className={styles.cta}>
                Get Started
              </a>
            </div>
          </div>
          <Hero3D />
        </section>

        {/* About Section */}
        <section id="about" className={styles.aboutSection}>
          <h2>About LinkVault</h2>
          <p>
            LinkVault is your secure, personal space for saving and organizing important links. Never lose track of a resource again—add tags, notes, and access your collection from anywhere.
          </p>
        </section>

        {/* How it Works Section */}
        <section id="how" className={styles.howSection}>
          <h2>How it Works</h2>
          <div className={styles.howSteps}>
            <div className={styles.howStep}>
              <div className={styles.howIcon}>🔗</div>
              <h3>1. Save Links</h3>
              <p>Quickly add any link you want to keep safe and handy.</p>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howIcon}>🏷️</div>
              <h3>2. Organize</h3>
              <p>Add tags and notes for easy recall and context.</p>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howIcon}>📋</div>
              <h3>3. Access Anywhere</h3>
              <p>Find all your saved links in a clean, unified dashboard anytime.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className={styles.pricingSection}>
          <h2>Pricing</h2>
          <div className={styles.pricingCard}>
            <h3>Free Forever</h3>
            <ul>
              <li>Unlimited links</li>
              <li>Tags & notes</li>
              <li>Secure cloud access</li>
              <li>Responsive dashboard</li>
              <li>No credit card required</li>
            </ul>
            <a href="/signup" className={styles.cta} style={{marginTop: 18}}>Sign Up Free</a>
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
