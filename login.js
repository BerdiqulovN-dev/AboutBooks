let username=$(".username")
let password=$(".passeord")

let elForm=$(".form")

elForm.addEventListener("submit", evt=>{
    evt.preventDefault();
    window.location.href= "./index.html";

    if(username.value=="eve.holt@reqres.in"&&password.value=="cityslicka"){

    }
})

