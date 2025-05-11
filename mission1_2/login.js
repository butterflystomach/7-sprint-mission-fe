document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.querySelector('.typeMail');
  const emailError = document.getElementById('email-error');
  const nicknameInput = document.querySelector('.typeName');
  const nicknameError = document.getElementById('nickname-error');
  const passwordInput = document.querySelector('.typePassword');
  const passwordError = document.getElementById('password-error');
  const checkPasswordInput = document.querySelector('.confirmPassword');
  const checkPasswordError = document.getElementById('checkPassword-error');
  const loginBtn = document.querySelector('.click');
  const signinBtn = document.querySelector('.click');

  function emailCheck(email_address) {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return email_regex.test(email_address);
  }

  function passwordCheck(password) {
    return password.length >= 8;
  }

  function passwordConfirm(password, checkPassword) {
    return password === checkPassword;
  }
  
  function nicknameCheck(nickname) {
    return nickname.trim() !== '';
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    let isValid = true;

    if (email === '') {
      emailError.textContent = '이메일을 입력해주세요.';
      emailError.style.color = '#F74747';
      emailError.style.fontSize = '15px';
      emailError.style.fontStyle = 'normal';
      emailError.style.fontWeight = '600';
      emailError.style.lineHeight = 'normal';
      emailError.style.paddingLeft = '16px';
      emailInput.style.border = '1px solid #F74747';
      isValid = false;
    } else if (!emailCheck(email)) {
      emailError.textContent = '잘못된 이메일 형식입니다.';
      emailError.style.color = '#F74747';
      emailError.style.fontSize = '15px';
      emailError.style.fontStyle = 'normal';
      emailError.style.fontWeight = '600';
      emailError.style.lineHeight = 'normal';
      emailError.style.paddingLeft = '16px';
      emailInput.style.border = '1px solid #F74747';
      isValid = false;
    } else {
      emailError.textContent = '';
      emailInput.style.border = '';
    }

    return isValid;
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    let isValid = true;

    if (password === '') {
      passwordError.textContent = '비밀번호를 입력해주세요.';
      passwordError.style.color = '#F74747';
      passwordError.style.fontSize = '15px';
      passwordError.style.fontStyle = 'normal';
      passwordError.style.fontWeight = '600';
      passwordError.style.lineHeight = 'normal';
      passwordError.style.paddingLeft = '16px';
      passwordInput.style.border = '1px solid #F74747';
      isValid = false;
    } else if (!passwordCheck(password)) {
      passwordError.textContent = '비밀번호를 8자리 이상 입력해주세요.';
      passwordError.style.color = '#F74747';
      passwordError.style.fontSize = '15px';
      passwordError.style.fontStyle = 'normal';
      passwordError.style.fontWeight = '600';
      passwordError.style.lineHeight = 'normal';
      passwordError.style.paddingLeft = '16px';
      passwordInput.style.border = '1px solid #F74747';
      isValid = false;
    } else {
      passwordError.textContent = '';
      passwordInput.style.border = '';
    }

    return isValid;
  }

  function validateCheckPassword() {
    const password = passwordInput.value.trim();               // 원본 비밀번호
    const checkingPassword = checkPasswordInput.value.trim(); // 확인용 비밀번호
    let isValid = true;
  
    if (checkingPassword === '') {
      checkPasswordError.textContent = '비밀번호를 확인해주세요.';
      checkPasswordError.style.color = '#F74747';
      checkPasswordError.style.fontSize = '15px';
      checkPasswordError.style.fontStyle = 'normal';
      checkPasswordError.style.fontWeight = '600';
      checkPasswordError.style.lineHeight = 'normal';
      checkPasswordError.style.paddingLeft = '16px';
      checkPasswordInput.style.border = '1px solid #F74747';
      isValid = false;
    } else if (!passwordConfirm(password, checkingPassword)) {
      checkPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
      checkPasswordError.style.color = '#F74747';
      checkPasswordError.style.fontSize = '15px';
      checkPasswordError.style.fontStyle = 'normal';
      checkPasswordError.style.fontWeight = '600';
      checkPasswordError.style.lineHeight = 'normal';
      checkPasswordError.style.paddingLeft = '16px';
      checkPasswordInput.style.border = '1px solid #F74747';
      isValid = false;
    } else {
      checkPasswordError.textContent = '';
      checkPasswordInput.style.border = '';
    }
  
    return isValid;
  }

  function validateNickname() {
    const nickname = nicknameInput.value.trim();
  
    if (nickname === '') {
      nicknameError.textContent = '닉네임을 입력해주세요.';
      nicknameError.style.color = '#F74747';
      nicknameError.style.fontSize = '15px';
      nicknameError.style.fontStyle = 'normal';
      nicknameError.style.fontWeight = '600';
      nicknameError.style.lineHeight = 'normal';
      nicknameError.style.paddingLeft = '16px';
      nicknameInput.style.border = '1px solid #F74747';
      return false;
    } else {
      nicknameError.textContent = '';
      nicknameInput.style.border = '';
      return true;
    }
  }

  function toggleLoginButton() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    const isValid = isEmailValid && isPasswordValid;

    loginBtn.disabled = !(isEmailValid && isPasswordValid);
    loginBtn.classList.toggle('enabled', isValid);
  }

  function toggleSigninButton() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordMatch =  checkPasswordInput ? validateCheckPassword() : true;
    const isNicknameEntered = nicknameInput ? validateNickname() : true;

    const isValid = isEmailValid && isPasswordValid && isPasswordMatch && isNicknameEntered;

    signinBtn.disabled = !isValid;
    signinBtn.classList.toggle('enabled', isValid);
  }

  // 이벤트 등록
  emailInput.addEventListener('blur', () => {
    validateEmail();
    toggleLoginButton();
  });

  passwordInput.addEventListener('blur', () => {
    validatePassword();
    toggleLoginButton();
  });

  emailInput.addEventListener('input', toggleLoginButton);
  passwordInput.addEventListener('input', toggleLoginButton);

  if (checkPasswordInput) {
    checkPasswordInput.addEventListener('blur', () => {
      validateCheckPassword();
      toggleSigninButton();
    });
    checkPasswordInput.addEventListener('input', toggleSigninButton);
  }
  
  if (nicknameInput) {
    nicknameInput.addEventListener('blur', () => {
      validateNickname();
      toggleSigninButton();
    });
    nicknameInput.addEventListener('input', toggleSigninButton);
  }

  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" }
  ];
  
  
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // 폼 기본 제출 방지
  
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
  
    // USER_DATA에서 해당 이메일을 가진 유저 찾기
    const user = USER_DATA.find(user => user.email === email);
  
    if (!user || user.password !== password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    // 로그인 성공
    alert('로그인 성공! 이동합니다.');
    window.location.href = '/items'; // 페이지 이동
  });

  

  signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    const nickname = nicknameInput.value.trim();
    const checkPassword = checkPasswordInput.value.trim();
  
    const isEmailDuplicate = USER_DATA.some(user => user.email === email);
  
    if (isEmailDuplicate) {
      alert('사용 중인 이메일입니다');
      return;
    }
  
    // 회원 정보 저장 (여기선 가짜 데이터베이스에 추가)
    USER_DATA.push({
      email: email,
      password: password,
      nickname: nickname
    });
  
    alert('회원가입이 완료되었습니다!');
    window.location.href = '/login'; // 로그인 페이지로 이동
  });

}); 