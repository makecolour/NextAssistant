const key = document.getElementById('key');

document.getElementById('togglePassword').addEventListener('click', () => {
    const password = document.getElementById('key');
    const icon = document.getElementsByClassName('eye')[0];
    if (password.type === 'password') {
        password.type = 'text';
        icon.src = '../utils/img/eyeoff.svg';
    } else {
        password.type = 'password';
        icon.src = '../utils/img/eye.svg';
    }
})