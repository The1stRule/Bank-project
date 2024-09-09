document.addEventListener('DOMContentLoaded', () => {
    let name = document.querySelector('#full-name');
    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    let email = document.querySelector('#email');
    let submit = document.querySelector('#signup-bt');
    let updateTotal = document.querySelector('#update-total-bt');

    function User(name, username, email, password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.total = '0';
    }

    function loadUsers() {
        let storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : {};
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (submit) {
        submit.addEventListener('click', (event) => {
            event.preventDefault();

            const nameUser = name.value.trim();
            const usernameUser = username.value.trim();
            const emailUser = email.value.trim();
            const passwordUser = password.value.trim();

            const user = new User(nameUser, usernameUser, emailUser, passwordUser);
            let users = loadUsers();
            users[emailUser] = user;

            saveUsers(users);

            console.log(users);

            if (name) name.value = '';
            if (username) username.value = '';
            if (email) email.value = '';
            if (password) password.value = '';
        });
    }

    if (updateTotal) {
        updateTotal.addEventListener('click', (event) => {
            event.preventDefault();

            const emailUser = email.value.trim();
            const trAmountInput = document.querySelector('#tr-amount');
            const trAmount = parseFloat(trAmountInput.value);

            if (emailUser && !isNaN(trAmount) && trAmount > 0) {
                let users = loadUsers();
                if (users[emailUser]) {
                    users[emailUser].total = trAmount;
                    saveUsers(users);

                    if (trAmountInput) trAmountInput.value = '';

                    alert('Total amount updated successfully.');
                } else {
                    alert('User not found.');
                }
            } else {
                alert('Please enter a valid email and amount.');
            }
        });
    }
});