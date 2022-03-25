const loginBtn = document.querySelector('#login-btn')
const loginNotifyDiv = document.querySelector('#login-notify-div')
const loginNotifyText = document.querySelector('#login-notify-div p')


//logging in

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const loginEmail = document.querySelector('#login-email')
    const loginPassword = document.querySelector('#login-password')

    const userLoginCredentials = {email: loginEmail.value, password: loginPassword.value}

    try{
        const {data} = await axios.post('/api/v1/users/login', userLoginCredentials)
        loginEmail.value = "";
        loginPassword.value = "";
        loginNotifyDiv.style.display = 'block'
        loginNotifyDiv.classList.remove('error-div')
        loginNotifyDiv.classList.add('success-div')
        loginNotifyText.innerHTML = 'login successfully...!';
        setTimeout(() => {window.location.href = 'http://localhost:3000/home.html'}, 2500)
    }catch(error){
        console.log(error)
        loginNotifyDiv.style.display = 'block'
        loginNotifyDiv.classList.remove('success-div')
        loginNotifyDiv.classList.add('error-div')
        loginNotifyText.innerHTML = error.response.data.msg
    }
    setTimeout( () => {
        loginNotifyDiv.classList.remove('success-div')
        loginNotifyDiv.classList.remove('error-div')
        loginNotifyDiv.style.display = 'none'
    },2500)
})