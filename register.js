let singupNameHandle = document.getElementById('texId1');
let signupEmailHandle = document.getElementById('emailId');
let singupPasswordHandle = document.getElementById('passwordId');
let signupFormHandle = document.getElementById('signup');
let signupButtonHandle = document.getElementById('buttonId1')
let mobileNumberHandle = document.getElementById('mobileId')

let singupNameSpanHandle = document.getElementById('nameSpan');
let singupEmailSpanHandle = document.getElementById('emailSpan')
let singupPasswordSpanHandle = document.getElementById('passwordSpan');
let loginButtonHandle = document.getElementById('buttonId')


let hasErrors = {
  username: true,
  email: true,
  password: true
}

function validateName() {
  if (singupNameHandle.value == '') {
    singupNameSpanHandle.innerHTML = 'Name Cannot be blank'
    hasErrors.username = true
  } else {
    singupNameSpanHandle.innerHTML = '';
    hasErrors.username = false;
  }

}

function validateEmail() {
  if (signupEmailHandle.value == '') {
    singupEmailSpanHandle.innerHTML = 'Email Cannot be blank'
    hasErrors.email = true
  } else {
    singupEmailSpanHandle.innerHTML = '';
    hasErrors.email = false;
  }

}

function validatePassword() {
  if (singupPasswordHandle.value == '') {
    singupPasswordSpanHandle.innerHTML = 'password Cannot be blank'
    hasErrors.password = true
  } else {
    singupPasswordSpanHandle.innerHTML = '';
    hasErrors.password = false;
  }

}


signupButtonHandle.addEventListener('click', (e) => {
  validateName();
  validateEmail();
  validatePassword();
  if (Object.values(hasErrors).includes(true)) {
    e.preventDefault();
  } else {
    let formData = {
      userName: singupNameHandle.value,
      email: signupEmailHandle.value,
      password: singupPasswordHandle.value,
      mobile: mobileNumberHandle.value

    }

    axios.post('http://localhost:3000/users/register', formData).then((response) => {
      console.log((response.data.tokens['0'].token));
      if(!response.data.errors) {
        window.localStorage.setItem('auth',response.data.tokens['0'].token);
        window.location=('file:///C:/full-stack-mern-june/News-project/user-select.html')
      }
    }).catch(err => {
      console.log(err)
    })
  }

}, false);


// loginButtonHandle.addEventListener('click', (e) => {
//   validateEmail();
//   validatePassword();
//   if (Object.values(hasErrors).includes(true)) {
//     e.preventDefault();
//   } else {
//     let formData = {
//       email: signupEmailHandle.value,
//       password: singupPasswordHandle.value

//     }

//     axios.post('http://localhost:3000/users/register', formData).then((response) => {
//       console.log(response.data);
//       //window.location.replace('http://localhost:3000/users')
//     }).catch(err => {
//       console.log(err)
//     })
//   }

// }, false);

