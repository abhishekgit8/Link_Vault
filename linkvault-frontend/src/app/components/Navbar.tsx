import Link from "next/link";
import styles from "../page.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <Link href="/">
          <span className={styles.logoText}>🔗 LinkVault</span>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#how">How it Works</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>
      <div className={styles.navActions}>
        <Link href="/login" className={styles.navBtnSecondary}>Login</Link>
        <Link href="/signup" className={styles.navBtnPrimary}>Sign Up</Link>
      </div>
    </nav>
  );
}
