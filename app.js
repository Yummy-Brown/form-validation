const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const captcha = document.getElementById("captcha");

form.addEventListener("submit" , (error) => {
    error.preventDefault();
    //check input fields
    checkInputs();
});
// all input fields are required, username (minLength is 5),
// email (must be a Valid email)
// password (minLength is 6)
// confirm password
// authentication (user must type enough)
captcha.addEventListener("input" , (error) => {
    const img = document.querySelector("img");
    const text = error.target.value;
    const blurValue = 20 - text.length;
    img.style.filter = `blur(${blurValue}px)`;
    if (blurValue <= 0) {
        setSuccess(captcha);
    } else {
        setError(captcha, "Text is not long enough");
    }
});


function checkInputs() {
    const userNameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const captchaValue = captcha.value.trim();

    // validate userName
    if (userNameValue === "") {
        // change border and display error messsage
        setError(userName, "Username is requred");
    } else if (userNameValue.length < 5) {
        setError (userName, "Minimum username length is 5");
    } else {
        setSuccess(userName);
    }
    
    // validate email
 if (emailValue === "") {
    // change border and display error messsage
    setError(email, "Email is requred");
} else if (!emailValue.includes("emailValue")) {
    setError (email, "Enter Valid email address");
} else {
    setSuccess(email);
}

   // validate password
   if (passwordValue === "") {
    // change border and display error messsage
    setError(password, "password is requred");
} else if (passwordValue.length < 6) {
    setError (password, "Minimum password length is 6");
} else if (!validatePassword(passwordValue)) {
    setError(password, "Must have uppercase, lowercase, number and special characters");
} else {
    setSuccess(password);
}     

 // validate password2
 if (password2Value === "") {
    // change border and display error messsage
    setError(password2, "Confirm password is requred");
} else if (password2Value !== passwordValue) {
    setError (password2, "Passwords do not match");
} else {
    setSuccess(password2);
} 

// validate captcha
if (captcha === "") {
    // change border and display error message
    setError(captcha, "Human Verification required")
}

};
 
function setError(input, errorMessage) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.textContent = errorMessage;
};

function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
};

// toggling showing password
const showBtn = document.querySelector(".show-btn");
showBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const inputType = password.getAttribute("type");
    if (inputType === "password") {
        password.setAttribute("type" , "text");
        showBtn.value = "Hide";
    } else {
        password.setAttribute("type" , "password");
        showBtn.value = "Show";
    }

});

    const showBtn2 = document.querySelector(".show2");
    showBtn2.addEventListener("click" , (e) => {
        e.preventDefault();
        const inputType = password2.getAttribute("type");
        if (inputType === "password") {
            password2.setAttribute("type" , "text");
            showBtn2.value = "Hide";
        } else {
            password2.setAttribute("type" , "password");
            showBtn2.value = "Show";
        }
});

// function that validates email
function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  };

// function that validates password
function validatePassword(password) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return regex.test(password);
};