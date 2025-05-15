
const nicknameInput = document.querySelector('.typeName');
const nicknameError = document.getElementById('nickname-error');
const checkPasswordInput = document.querySelector('.confirmPassword');
const checkPasswordError = document.getElementById('password-error');
const signUpBtn = document.querySelector('.click');

function checkNickname(nickname) {
    return nickname.trim() !== '';
}

function passwordCheck(password) {
    return password.length >= 8;
  }

function confirmCheckPassword(password) {
    return password === password;
}

function validateNickname() {
    const nickname = nicknameInput.value.trim();
    let isValid = true;

    if (!checkNickname) {
        nicknameError.textContent = '닉네임을 입력해주세요.';
        nicknameError.style.color = '#F74747';
        nicknameError.style.fontSize = '15px';
        nicknameError.style.fontWeight = '600';
        nicknameError.style.paddingLeft = '16px';
        nicknameError.style.border = '1px solid #F74747';
        isValid = false;
    } else {
        nicknameError.textContent = '';
        nicknameError.style.border = '';
    }
    return isValid;
}