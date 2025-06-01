import facebookIcon from '../assets/ic_facebook.svg';
import twitterIcon from '../assets/ic_twitter.svg';
import youtubeIcon from '../assets/ic_youtube.svg';
import instagramIcon from '../assets/ic_instagram.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="underBar">
      <div className="foot">
        <p className="copyRight">@codeit - 2024</p>
        <p className="privacyFaq">
          <a href="./html/privacy/" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="./html/faq/" target="_blank" rel="noopener noreferrer">
            FAQ
          </a>
        </p>
        <p className="sns">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
          
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </p>   
      </div>
    </footer>
  );
}

export default Footer;