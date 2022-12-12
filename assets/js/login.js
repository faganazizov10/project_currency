let new_user = document.querySelector(".new_user")
let old_user = document.querySelector(".old_user")

let submit_btns = document.querySelectorAll(".submit-btn")
var card = document.getElementById("cardinner");
let check_side = "login";
//
let log_email_inpt = document.querySelector('.log_email');
let log_password_inpt = document.querySelector(".log_password");

let reg_name = document.querySelector(".reg_name")
let reg_email = document.querySelector(".reg_email")
let reg_password = document.querySelector(".reg_password")
//
function openRegister() {
    card.style.transform = "rotateY(-180deg)";
}

function openLogin() {
    card.style.transform = "rotateY(0deg)";
}
//local storage check
let loc_data;
if (localStorage.getItem('users')) {
    loc_data = localStorage.getItem('users')
} else {
    localStorage.setItem('users', JSON.stringify([]))
    loc_data = JSON.parse(localStorage.getItem('users'))
}
//
new_user.addEventListener('click', () => {
    check_side = "register"
})
old_user.addEventListener('click', () => {
    check_side = "login"
})
submit_btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let success=true;
        if (check_side == "login" && log_email_inpt.value.trim() != "" && log_password_inpt.value.trim() != "") {
            let check_user={
                email:log_email_inpt.value.trim(),
                password:log_password_inpt.value.trim()
            }
            let logged_user= JSON.parse(localStorage.getItem('users')).filter(user=>user.email==check_user.email&&user.password==check_user.password)
            if(logged_user.length==0){
                alert("bele user yoxdur")
            }else{
                
            }
        } 
        else if (check_side == "register" && reg_name.value.trim() !="" && reg_email.value.trim() !="" && reg_password.value.trim() !="") {
            let new_user = {
                name:reg_name.value.trim(),
                email: reg_email.value.trim(),
                password: reg_password.value.trim()
            }
            let truck_data = JSON.parse(localStorage.getItem('users'))
            truck_data.forEach(data=>{
                if(data.name==new_user.name||data.email==new_user.email){
                    alert("bele user var")
                    success=false;
                    return;
                }
            })
            if(success){
                truck_data.push(new_user)
                localStorage.setItem('users', JSON.stringify(truck_data))
                console.log(JSON.parse(localStorage.getItem("users")))
            }
            
        }
    })
})
