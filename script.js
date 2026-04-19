//the function activated when the form's submit button is clicked, will check validations
function validateForm() {

    //a starting point, will get false if one validation is not followed
    let isValid = true;

    //reseting the values of the innerHTML of the spans and message success
    let messageSuccess = document.getElementById("messageSuccess");
    document.querySelectorAll("span").forEach(s => s.innerHTML = "");
    messageSuccess.innerHTML = "";

    //personal information initialization
    let fullname = document.getElementById("fname").value.trim();
    let birthd = document.getElementById("bday").value;
    let sex = document.getElementsByName("sex");
    let email = document.getElementById("email").value.trim();

    //account fields initialization
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("pass").value;
    let confirmpass = document.getElementById("confpass").value;

    //topic questions initialization
    let selfLove = document.getElementById("selfLove").value;
    let goals = document.getElementsByName("goals");
    let comments = document.getElementById("comments").value.trim();

    //full name validation through finding length
    if (fullname.length < 2) {
        document.getElementById("fnameEr").innerHTML = "Full name must be at least 2 characters.";
        isValid = false;
    }

    //birthday validation through checking if there is a value inputted
    if (!birthd) {
        document.getElementById("bdayEr").innerHTML = "Birthdate is required.";
        isValid = false;
    } 
    
    //if there is a value, we will get their age, and validate whether they are 13 years old or above
    else {
        let birthday = new Date(birthd);
        let present = new Date();
        let age = present.getFullYear() - birthday.getFullYear();
        let monthDiff = present.getMonth() - birthday.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && present.getDate() < birthday.getDate())) {
            age--;
        }

        if (age < 13) {
            document.getElementById("bdayEr").innerHTML = "You must be at least 13 years old.";
            isValid = false;
        }
    }

    //sex validation through for loops
    let sexSelected = false;
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sexSelected = true;
            break;
        }
    }

    if (!sexSelected) {
        document.getElementById("sexEr").innerHTML = "Please select a gender.";
        isValid = false;
    }

    //email validation through for loops (for finding an @ in their input)
    let atIncluded = false;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == "@") {
            atIncluded = true;
            break;
        }
    }

    if (!atIncluded) {
        document.getElementById("emailEr").innerHTML = "You are lacking an @.";
        isValid = false;

    //using else if, we will validate whether or not there is a dot after the @
    } else if (email.lastIndexOf(".") < email.indexOf("@")) {
        document.getElementById("emailEr").innerHTML = "You are lacking a dot after the @.";
        isValid = false;
    }

    //username validation, detects if there is a space (through for loops), if there is not it checks the length, and letters/numbers only
    let userRegex = /^[A-Za-z0-9]{8,20}$/;
    let spaceDetect = false;
    for (let i = 0; i < username.length; i++) {
        if (username[i] == " ") {
            spaceDetect = true;
            break;
        }
    }

    if (spaceDetect) {
        document.getElementById("usernameEr").innerHTML = "Must not include a space.";
        isValid = false;
    } else if (!userRegex.test(username)) {
        document.getElementById("usernameEr").innerHTML = "Username must be 8–20 letters or numbers only.";
        isValid = false;
    }

    //password validation using if statements
    let passEr = document.getElementById("passwEr");
    if (password.length < 10) {
        passEr.innerHTML += "Password must be at least 10 characters. ";
        isValid = false;
    }
    if (!/[A-Z]/.test(password)) {
        passEr.innerHTML += "Must include an uppercase letter. ";
        isValid = false;
    }
    if (!/[a-z]/.test(password)) {
        passEr.innerHTML += "Must include a lowercase letter. ";
        isValid = false;
    }
    if (!/[0-9]/.test(password)) {
        passEr.innerHTML += "Must include a number. ";
        isValid = false;
    }

    //confirm password validation by comparing it to the password inputted
    if (password !== confirmpass) {
        document.getElementById("confpassEr").innerHTML = "Passwords do not match. Please try again.";
        isValid = false;
    }

    //topic question number 1, self love validation
    if (selfLove === "") {
        document.getElementById("selfLoveEr").innerHTML = "Please select how much you love yourself.";
        isValid = false;
    }

    //topic question number 2, goals validation
    let goalSelected = false;
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].checked) {
            goalSelected = true;
            break;
        }
    }

    if (!goalSelected) { 
        document.getElementById("goalsEr").innerHTML = "Please pick at least one health goal.";
        isValid = false;
    }

    //if all validations are followed, will put value on innerHTML of messageSuccess to indicate they have answered all properly
    if (isValid) {
        messageSuccess.innerHTML = 'Sign Up Successful! Please click <a href="https://bananagail9.github.io/ZGPDEGUITO---CS3-Project/">here</a> to proceed to homepage.';
    }
}
