import restApiUrl from "../../js/script"

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        const username = document.querySelector(".username").value;
        const password = document.querySelector(".passwod").value;


        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else{
            event.preventDefault()
            event.stopPropagation()
            const userData = {
                username,
                password
            }

            axios.post(restApiUrl + "/auth/login", userData)
            .then((response)=>{
                console.log(response.data);
                if(response.data.message){
                    alert("Успешный вход:");
                    localStorage.setItem("token",response.data)
                }else{
                    alert("Успешный вход");
                }
                window.location.href = "/index.html"
            })
            .catch((error) =>{
                if(error.response && error.response.data){
                    alert("Ошибка при входе:"+ error.response.data.message || error.response.data);
                }else if(error.request){
                    alert("Ошиьбка запроса: Нет ответа от сервера.")
                }else{
                    alert("Неизвестная ошибка: " + error.message)
                }
            })
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()