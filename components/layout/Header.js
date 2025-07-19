import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link className={styles.logo} href="/">
          <Image
            src="/images/logo.svg"
            alt="판다마켓 로고"
            width={24}
            height={24}
          />
          <span className={styles.logoText}>판다마켓</span>
        </Link>
      </Container>
    </header>
  );
}
