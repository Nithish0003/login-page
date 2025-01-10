document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email"),
    password = document.getElementById("pass"),
    form = document.getElementById("form"),
    register_form = document.getElementById("form2"),
    name = document.getElementById("name"),
    name_error = document.getElementById("name_error"),
    email_error = document.getElementById("email_error"),
    pass_error = document.getElementById("pass_error"),
    emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  form.addEventListener("submit", (e) => {
    const valid = error_validation(e);
    if (valid == true) {
      alert("Login Successful");
    }
  });
  register_form.addEventListener("submit", (e) => {
    const val = error_validation(e);
    console.log(val);
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
    }
    if (valid && val) {
      alert("Sign_up Successful");
    }
  });
  function error_validation(e) {
    let valid = true;
    if (!emailPattern.test(email.value)) {
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
      pass_error.innerHTML = "Enter a valid password";
      valid = false;
      pass_error.classList.add("fade-out");
      setTimeout(() => {
        pass_error.classList.add("hidden");
        setTimeout(() => {
          pass_error.innerHTML = "";
          pass_error.classList.remove("hidden", "fade-out");
        }, 1000);
      }, 2000);
    } else {
      e.preventDefault();
      email_error.innerHTML = "";
      pass_error.innerHTML = "";
      valid = true;
    }
    return valid;
  }
});
