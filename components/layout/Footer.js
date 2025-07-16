import Image from "next/image";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: var(--gray-900);
  color: var(--gray-400);
  font-size: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;

  @media (min-width: 768px) {
    padding: 32px 104px 108px 104px;
  }

  @media (min-width: 1280px) {
    padding: 32px 200px 108px 200px;
  }
`;

const Copyright = styled.div`
  order: 3;
  flex-basis: 100%;

  @media (min-width: 768px) {
    flex-basis: auto;
    order: 0;
  }
`;

const FooterMenu = styled.div`
  display: flex;
  gap: 30px;
  color: var(--gray-200);

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled.a`
  display: inline-block;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Footer = () => (
  <FooterContainer>
    <Copyright>©codeit - 2024</Copyright>

    <FooterMenu>
      <a href="/privacy">Privacy Policy</a>
      <a href="/faq">FAQ</a>
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
  </FooterContainer>
);

export default Footer;
