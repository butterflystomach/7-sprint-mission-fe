import Link from "next/link";
import styles from "./Footer.module.css";
import Container from "../Container";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Copyright>@codeit - 2024</Copyright>
        <FooterMenu>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </FooterMenu>
        <SocialMedia>
          <SocialLink
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 페이스북"
          >
            <Image
              src="/images/facebook-logo.svg"
              alt="페이스북"
              width={20}
              height={20}
            />
          </SocialLink>
          <SocialLink
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 트위터"
          >
            <Image
              src="/images/twitter-logo.svg"
              alt="트위터"
              width={20}
              height={20}
            />
          </SocialLink>
          <SocialLink
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 유튜브"
          >
            <Image
              src="/images/youtube-logo.svg"
              alt="유튜브"
              width={20}
              height={20}
            />
          </SocialLink>
          <SocialLink
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 인스타그램"
          >
            <Image
              src="/images/instagram-logo.svg"
              alt="인스타그램"
              width={20}
              height={20}
            />
          </SocialLink>
        </SocialMedia>
      </Container>
    </footer>
  );
}
