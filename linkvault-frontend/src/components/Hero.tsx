import styles from "../app/page.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1>LinkVault</h1>
      <p className={styles.tagline}>
        Your personal vault for saving, organizing, and accessing useful links.
      </p>
      <a href="/signup" className={styles.cta}>
        Get Started
      </a>
    </section>
  );
}
