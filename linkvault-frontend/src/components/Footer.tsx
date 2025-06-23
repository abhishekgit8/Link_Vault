import styles from "../app/page.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} Linker. All rights reserved.
    </footer>
  );
}
