document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email"),
    password = document.getElementById("pass"),
    form = document.getElementById("form"),
    login_email = document.getElementById("login_email"),
    login_pass = document.getElementById("login_pass"),
    register_form = document.getElementById("form2"),
    name = document.getElementById("name"),
    name_error = document.getElementById("name_error"),
    email_error = document.getElementById("email_error"),
    pass_error = document.getElementById("pass_error"),
    sendOtpBtn = document.getElementById("send_otp"),
    reset_email = document.getElementById("reset_email"),
    otpVerify = document.querySelector(".otp-verify"),
    otp_inp = document.getElementById("otp_inp"),
    otp_btn = document.getElementById("otp_btn"),
    emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (form) {
    form.addEventListener("submit", (e) => {
      let valid = true;
      if (!emailPattern.test(login_email.value)) {
        e.preventDefault();
        email_error.innerHTML = "Enter a valid email";
        valid = false;
        email_error.classList.add("fade-out");
        setTimeout(() => {
          email_error.classList.add("hidden");
          setTimeout(() => {
            email_error.innerHTML = "";
            email_error.classList.remove("hidden", "fade-out");
          }, 1000);
        }, 2000);
      } else if (!passwordPattern.test(login_pass.value)) {
        e.preventDefault();
        pass_error.innerHTML =
          "Enter a valid password:1)At least one lowercase letter,2)At least one uppercase letter,3)At least one digit,4)At least one special character (!@#$%^&*),5)Minimum length of 8 characters";
        valid = false;
        pass_error.classList.add("fade-out");
        setTimeout(() => {
          pass_error.classList.add("hidden");
          setTimeout(() => {
            pass_error.innerHTML = "";
            pass_error.classList.remove("hidden", "fade-out");
          }, 1000);
        }, 4000);
      } else {
        e.preventDefault();
        email_error.innerHTML = "";
        pass_error.innerHTML = "";
        valid = true;
      }
      if (valid) {
        validateLoginDetails(form);
      }
    });
  }
  if (register_form) {
    register_form.addEventListener("submit", (e) => {
      const valid = error_validation(e);
      if (valid) {
        saveSignupDetails(register_form);
      }
    });
  }
  function error_validation(e) {
    let valid = true;
    if (name.value.trim() === "") {
      e.preventDefault();
      name_error.innerHTML = "Enter a valid name";
      valid = false;
      name_error.classList.add("fade-out");
      setTimeout(() => {
        name_error.classList.add("hidden");
        setTimeout(() => {
          name_error.innerHTML = "";
          name_error.classList.remove("hidden", "fade-out");
        }, 1000);
      }, 2000);
    } else if (!emailPattern.test(email.value)) {
      e.preventDefault();
      email_error.innerHTML = "Enter a valid email";
      valid = false;
      email_error.classList.add("fade-out");
      setTimeout(() => {
        email_error.classList.add("hidden");
        setTimeout(() => {
          email_error.innerHTML = "";
          email_error.classList.remove("hidden", "fade-out");
        }, 1000);
      }, 2000);
    } else if (!passwordPattern.test(password.value)) {
      e.preventDefault();
      pass_error.innerHTML =
        "Enter a valid password:1)At least one lowercase letter,2)At least one uppercase letter,3)At least one digit,4)At least one special character (!@#$%^&*),5)Minimum length of 8 characters";
      valid = false;
      pass_error.classList.add("fade-out");
      setTimeout(() => {
        pass_error.classList.add("hidden");
        setTimeout(() => {
          pass_error.innerHTML = "";
          pass_error.classList.remove("hidden", "fade-out");
        }, 1000);
      }, 4000);
    } else {
      e.preventDefault();
      email_error.innerHTML = "";
      pass_error.innerHTML = "";
      valid = true;
    }
    return valid;
  }
  function saveSignupDetails(form) {
    const email = form.querySelector("#email").value;
    const pass = form.querySelector("#pass").value;
    localStorage.setItem("email", email);
    localStorage.setItem("pass", pass);
    alert("Signup Successful");
    form.reset();
  }
  function validateLoginDetails(form) {
    const email = form.querySelector("#login_email").value;
    const pass = form.querySelector("#login_pass").value;
    const storedEmail = localStorage.getItem("email");
    const storedPass = localStorage.getItem("pass");
    if (email === storedEmail && pass === storedPass) {
      alert("Login Successful");
    } else {
      alert("Invalid email or password");
    }
  }
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener("click", sendOTP);
  } else {
    console.log("otp error");
  }
  function sendOTP() {
    let otp_val = Math.floor(Math.random() * 10000);
    let email_body = `<h2>Your OTP is: </h2>${otp_val}`;
    Email.send({
      SecureToken: "930828ab-03f8-4696-ab46-0696f00edbf1",
      To: reset_email.value,
      From: "luffy4532@gmail.com",
      Subject: "Email otp using JavaScript",
      Body: email_body,
    }).then((message) => {
      if (message === "OK") {
        alert("OTP sent to your email: " + reset_email.value);
        otpVerify.style.display = "flex";
        otp_btn.addEventListener("click", () => {
          if (otp_inp.value === otp_val.toString()) {
            alert("Email address Verified!!");
          } else {
            alert("Invalid OTP");
          }
        });
      }
    });
  }
});
