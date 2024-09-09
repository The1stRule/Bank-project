document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    function loadUsers() {
        let storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : {};
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function saveCurrentUser() {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    if (currentUser) {
        currentUser.total = parseFloat(currentUser.total) || 0;

        document.querySelector('#username').innerHTML = `<span>Welcome Back</span>, ${currentUser.username}`;
        document.querySelector('#fullname').textContent = currentUser.name;
        document.querySelector('#total-amount').textContent = `$${currentUser.total.toFixed(2)}`;

        function updateLocalStorageUsers() {
            let users = loadUsers();
            if (users[currentUser.email]) {
                users[currentUser.email].total = currentUser.total;
                saveUsers(users);
            }
        }

        document.querySelector('#request-bt').addEventListener('click', (event) => {
            event.preventDefault();

            let amountInput = document.querySelector('#amount');
            let passwordInput = document.querySelector('#password');
            let amount = parseFloat(amountInput.value);
            let password = passwordInput.value;

            if (!isNaN(amount) && amount > 0) {
                if (password === currentUser.password) {
                    currentUser.total += amount;

                    updateLocalStorageUsers();

                    saveCurrentUser();

                    document.querySelector('#total-amount').textContent = `$${currentUser.total.toFixed(2)}`;

                    amountInput.value = '';
                    passwordInput.value = '';
                } else {
                    alert('Incorrect password.');
                }
            } else {
                alert('Please enter a valid amount.');
            }
        });

        document.querySelector('#transfer-bt').addEventListener('click', (event) => {
            event.preventDefault();

            let trAmountInput = document.querySelector('#tr-amount');
            let recipientEmailInput = document.querySelector('#email');
            let trAmount = parseFloat(trAmountInput.value);
            let recipientEmail = recipientEmailInput.value.trim();

            if (!isNaN(trAmount) && trAmount > 0) {
                if (currentUser.total >= trAmount) {
                    currentUser.total -= trAmount;

                    let users = loadUsers();
                    if (users[recipientEmail]) {
                        users[recipientEmail].total = parseFloat(users[recipientEmail].total) + trAmount;
                    } else {
                        users[recipientEmail] = {
                            name: 'Unknown', 
                            username: 'Unknown', 
                            email: recipientEmail,
                            password: 'Unknown',
                            total: trAmount
                        };
                    }
                    saveUsers(users);

                    document.querySelector('#total-amount').textContent = `$${currentUser.total.toFixed(2)}`;
                    document.querySelector('#out-money').textContent = `$${trAmount.toFixed(2)}`;

                    saveCurrentUser();

                    trAmountInput.value = '';
                    recipientEmailInput.value = '';
                } else {
                    alert('Insufficient funds.');
                }
            } else {
                alert('Please enter a valid amount.');
            }
        });
    } else {
        window.location.href = './sign in.html';
    }
});