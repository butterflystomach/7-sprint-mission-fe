import Link from "next/link";
import styles from "./Footer.module.css";
import Container from "../Container";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.copyright}>
          <p>@codeit - 2024</p>
        </div>

        <div className={styles.links}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>

        <div className={styles.socialLinks}>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 페이스북"
          >
            <Image
              src="/images/ic_facebook.svg"
              alt="페이스북"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 트위터"
          >
            <Image
              src="/images/ic_twitter.svg"
              alt="트위터"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 유튜브"
          >
            <Image
              src="/images/ic_youtube.svg"
              alt="유튜브"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 인스타그램"
          >
            <Image
              src="/images/ic_instagram.svg"
              alt="인스타그램"
              width={20}
              height={20}
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
