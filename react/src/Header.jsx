function Header() {
  const handleLogoClick = () => {
    // 홈으로 이동하는 로직
    window.location.href = '../mission_pandaMarket/html/index.html';
  };

  const handleLoginClick = () => {
    // 로그인 페이지로 이동하는 로직
    window.location.href = '/login';
  };

  return (
    <header>
      <div className="top">
        <div className="logo">
          <button className="logoImg" onClick={handleLogoClick}>
            <img src="../mission_pandaMarket/img/판다 얼굴.svg" alt="판다마켓" />
          </button>
          <h1 className="logoTxt">판다마켓</h1>
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