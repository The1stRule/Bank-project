document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    function loadUsers() {
        let storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : {};
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (currentUser) {
        document.querySelector('#username').innerHTML = `<span>Welcome Back</span>, ${currentUser.username}`;
        document.querySelector('#fullname').textContent = currentUser.name;

        document.querySelector('#name-change').addEventListener('click', (event) => {
            event.preventDefault();

            const newUsername = document.querySelector('#new-usname').value;
            const checkbox = document.querySelector('#checkbox').checked;

            if (newUsername) {
                currentUser.username = newUsername;
                currentUser.name = newUsername;

                let users = loadUsers();
                users[currentUser.email] = currentUser;
                saveUsers(users);

                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

                document.querySelector('#username').innerHTML = `<span>Welcome Back</span>, ${currentUser.username}`;

                if (checkbox) {
                    sessionStorage.removeItem('currentUser');
                    window.location.href = './sign in.html';
                }
            } else {
                alert('Please enter a new username.');
            }
        });

        document.querySelector('#pass-change').addEventListener('click', (event) => {
            event.preventDefault();

            const currentPassword = document.querySelector('#password').value;
            const newPassword = document.querySelector('#new-pass').value;
            const confirmPassword = document.querySelector('#conf-pass').value;
            const checkbox = document.querySelector('#checkbox-1').checked;

            if (newPassword === confirmPassword) {
                if (currentPassword === currentUser.password) {
                    currentUser.password = newPassword;

                    let users = loadUsers();
                    users[currentUser.email] = currentUser;
                    saveUsers(users);

                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

                    document.querySelector('#password').value = '';
                    document.querySelector('#new-pass').value = '';
                    document.querySelector('#conf-pass').value = '';

                    if (checkbox) {
                        sessionStorage.removeItem('currentUser');
                        window.location.href = './sign in.html';
                    }
                } else {
                    alert('Current password is incorrect.');
                }
            } else {
                alert('New password and confirm password do not match.');
            }
        });
    } else {
        window.location.href = './sign in.html';
    }
});