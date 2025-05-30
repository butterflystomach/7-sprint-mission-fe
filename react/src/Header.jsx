import logoImg from './assets/panda-logo.svg'; 

function Header() {
  const handleLogoClick = () => {
    // React Router 사용 시: navigate('/');
    window.location.href = '/';
  };

  const handleLoginClick = () => {
    // React Router 사용 시: navigate('/login');
    window.location.href = '/login';
  };

  return (
    <header>
      <div className="top">
        <div className="logo">
          <h1 className="logoImg">
            <img src={logoImg} alt="판다마켓 로고" />
          </h1>
          <h1 className="logoTxt">판다마켓</h1>
        </div>
        <div className='newPage'>
          <p className='newPageTxt'>자유게시판</p>
          <p className='newPageTxt'>중고마켓</p>
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