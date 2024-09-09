document.addEventListener('DOMContentLoaded', () => {
    let emailInput = document.querySelector('#email');
    let passwordInput = document.querySelector('#password');
    let form = document.querySelector('#form-signin');

    function loadUsers() {
        let storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : {};
    }

    function redirectTo(url) {
        window.location.href = url;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailUser = emailInput.value.trim();
        const passwordUser = passwordInput.value.trim();

        let users = loadUsers();
        let user = users[emailUser];

        if (user && user.password === passwordUser) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful');
            redirectTo('./dashboard.html');
        } else {
            alert('Invalid email or password');
        }
    });
});