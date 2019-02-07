const loginWeb = {
    loginPage: function () {
        return `
<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="login.css"/>
    <title>login</title>
</head>

<body>
    <div class="login-field">
        <form class="login-form" action="/login" method="POST" />
        <input class="user-name" name="username" value="" placeholder="Input your user name" />
        <button class="submit-button" type="submit">Sign In</button>
    </div>
</body>

</html>
        
        `;
    }
};

module.exports = loginWeb;