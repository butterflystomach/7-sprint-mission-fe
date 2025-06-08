import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/panda-logo.svg";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    // 로그인 페이지가 구현되면 navigate('/login'); 사용
    window.location.href = "/login";
  };

  return (
    <header>
      <div className="top">
        <div
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <h1 className="logoImg">
            <img src={logoImg} alt="판다마켓 로고" />
          </h1>
          <h1 className="logoTxt">판다마켓</h1>
        </div>
        <div className="newPage">
          <Link to="/" className="newPageTxt">
            자유게시판
          </Link>
          <Link to="/items" className="newPageTxt">
            중고마켓
          </Link>
        </div>
        <div className="login">
          <button
            className="loginBtn btnStyle btnTxt"
            onClick={handleLoginClick}
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
