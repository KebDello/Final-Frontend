import restApiUrl from "../../js/script"

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        const name = document.querySelector(".name").value;
        const surname = document.querySelector(".surname").value;
        const email = document.querySelector(".email").value;
        const username = document.querySelector(".username").value;
        const password = document.querySelector(".passwod").value;


        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else{
            event.preventDefault()
            event.stopPropagation()
            const newUser = {
                name,
                surname,
                email,
                username,
                password
            }

            axios.post(restApiUrl + "/auth/register", newUser)
            .then((response)=>{
                console.log(response.data);
                if(response.data.message){
                    alert("Успешная регестрация:" + response.data.message);
                }else{
                    alert("Регестрация прошла успешно!")
                }

                window.location.href = "/pages/logIn/login.html"
            })
            .catch((error) =>{
                xonsole.error(error);

                if(error.response){
                    alert("Ошибка при регестрации:"+ error.response.data);
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