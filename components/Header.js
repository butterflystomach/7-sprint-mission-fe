import Link from "next/link";
import styles from "./Header.module.css";
import Container from "./Container.js";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link className={styles.logo} href="/">
          판다마켓
        </Link>
        <Link className={styles.setting} href="/setting">
          자유게시판
        </Link>
        <Link className={styles.setting} href="/setting">
          중고마켓
        </Link>
        <Link className={styles.button} href="/setting">
          로그인
        </Link>
      </Container>
    </header>
  );
}
