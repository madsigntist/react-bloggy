import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.title}>
        <a href="https://www.michaelkellyhash.com" target="blank">
          <h3>www.michaelkellyhash.com</h3>
        </a>
      </div>
    </div>
  );
}
