const emailInput = document.querySelector('.typeMail');
const emailError = document.getElementById('#email-error');
const passwordInput = document.querySelector('.typePassword');
const passwordConfirmInput = document.querySelector('.confirmPassword');

function emailCheck(email_address) {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return email_regex.test(email_address);
}

function passwordCheck(password) {
    return password.length >= 8;
}

function passwordConfirm(password, passwordCheck) {
    return password === passwordCheck;
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