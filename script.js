// capture the form submit event
const signupForm = document.getElementById("form")
  .addEventListener("submit", handleSignupFormSubmit)

function handleSignupFormSubmit(e) {
  // prevent default browser behaviour
  e.preventDefault()

  // get email and password
  const email = document.getElementById("email")
  const password = document.getElementById("password")
  const confirmPassword = document.getElementById("confirmPassword")

  // validate email and password
  const passwordError = validatePassword(password.value, 6)
  const emailError = validateEmail(email.value)

  // show error message if any
  if (passwordError || emailError) {
    alert(passwordError || emailError)
    return
  }

  // check if password and confirm password match
  if (confirmPassword.value != password.value) {
    alert("Password does not match")
    return
  }
  // submit email and password to an API
  signup({ email: email.value, password: password.value })
}

// Signup function

function signup(data) {
  fetch("http://localhost:4000/api/signup", {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials:"same-origin",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => json?.message && window.location.replace("/login"))
}
console.log("linked")
function validateEmail(email) {
  if (!email) return "Email is required"

  const isValidEmail = /^\S+@\S+$/g
  if (!isValidEmail.test(email)) {
    return "Please enter a valid email"
  }

  return ""
}

function validatePassword(password, minlength) {
  if (!password) return "Password is required"

  if (password.length < minlength) {
    return "Please enter a password that's at least ${minlength} characters long"
  }

  return ""
}
