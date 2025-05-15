
  const emailInput = document.querySelector('.typeMail');
  const emailError = document.getElementById('email-error');
  const passwordInput = document.querySelector('.typePassword');
  const passwordError = document.getElementById('password-error');
  const loginBtn = document.querySelector('.click');

  function emailCheck(email_address) {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return email_regex.test(email_address);
  }

  function passwordCheck(password) {
    return password.length >= 8;
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

  function toggleLoginButton() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    const isValid = isEmailValid && isPasswordValid;

    loginBtn.disabled = !(isEmailValid && isPasswordValid);
    loginBtn.classList.toggle('enabled', isValid);
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
    window.location.href = './html/items/'; // 페이지 이동
  });



