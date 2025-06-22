import styles from "../app/page.module.css";

export default function Features() {
  return (
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
  );
}
