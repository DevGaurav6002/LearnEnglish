
const signBtn = document.querySelector('#sign-up')
const notifyDiv = document.querySelector('#notify-div')
const notifyText = document.querySelector('#notify-div p')

//signing up
signBtn.addEventListener('click', async (e) => {
        const userName = document.querySelector('#name')
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')
        const userCredentials = { name: userName.value, email: email.value, password: password.value}
        e.preventDefault();
        
        try{
            const {data} = await axios.post('/api/v1/users/register', userCredentials)
            userName.value = ''
            email.value = ''
            password.value = ''
            notifyDiv.style.display = 'block'
            notifyDiv.classList.remove('error-div')
            notifyDiv.classList.add('success-div')
            notifyText.innerHTML = 'Registerd successfully...!';
            setTimeout(() => {window.location.href = 'http://localhost:3000/login.html'}, 2500)
        }catch(error){
            console.log(error.response.data.msg)
            notifyDiv.style.display = 'block'
            notifyDiv.classList.remove('success-div')
            notifyDiv.classList.add('error-div')
            notifyText.innerHTML = error.response.data.msg
        }
        setTimeout( () => {
            notifyDiv.classList.remove('success-div')
            notifyDiv.classList.remove('error-div')
            notifyDiv.style.display = 'none'
        },2500)
})
