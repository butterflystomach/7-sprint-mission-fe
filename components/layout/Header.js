import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import styles from "./Header.module.css";
import Button from "../Button";

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
        <div className={styles.tab}>
          <Link className={styles.article} href="/">
            <span>자유게시판</span>
          </Link>
          <Link className={styles.market} href="/">
            <span>중고마켓</span>
          </Link>
        </div>
        <Button className={styles.button} href="/login">
          <span>로그인</span>
        </Button>
      </Container>
    </header>
  );
}
