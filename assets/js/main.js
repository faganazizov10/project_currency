let firstImpt = document.querySelector('#first_impt');
let secondimpt = document.querySelector('#second_impt');
let first_side_btns = document.querySelectorAll('.first_side_btns')
let second_side_btns = document.querySelectorAll('.second_side_btns')
let bottom_side_of_currency_first = document.querySelector('.first_bottom')
let bottom_side_of_currency_second = document.querySelector('.second_bottom')
let login_btn= document.querySelector(".login_btn");
let login_part= document.querySelector(".login_part");
let close_btn=document.querySelector(".close_btn")
const usd_value = 1;
var obj;


var success = true;
async function apiFunc() {
    try {
        const response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols');
        const rates = await response.json();
        success = true;
        return rates;
    } catch (error) {
        success = false;
        console.log(error)
        return []
    }

}

// apiFunc().then(res => {
//     console.log(res.rates);
// })

login_btn.addEventListener('click',(e)=>{
    login_part.classList.remove("deactive")
})
close_btn.addEventListener("click",()=>{
    login_part.classList.add("deactive")
})
if (success) {
    first_side_btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let btn_checked_btn_for_value_change = e.target.innerText
            let second_side_checked_btn = document.querySelector('.checked_btn2').innerText

            if (btn_checked_btn_for_value_change != second_side_checked_btn) {
                document.querySelector('.checked_btn1').classList.remove('checked_btn1')
                e.target.classList.add('checked_btn1')
                if (firstImpt.value) {
                    apiFunc().then(res => {
                        secondimpt.value = res.rates[`${second_side_checked_btn}`]
                            /
                            res.rates[`${btn_checked_btn_for_value_change}`] * firstImpt.value
                    })
                }
                apiFunc().then(res => {
                    bottom_side_of_currency_first.innerText = `1 ${e.target.innerText}`
                        + " = " + `${(res.rates[second_side_checked_btn] / res.rates[e.target.innerText]).toFixed(4)}`
                        + `${second_side_checked_btn}`
                    bottom_side_of_currency_second.innerText = `1 ${second_side_checked_btn}`
                        + ` = `
                        + `${(res.rates[e.target.innerText] / res.rates[second_side_checked_btn]).toFixed(4)}`
                        + ` ${e.target.innerText}`
                })
            } else {
                alert("change")
            }

        })
    })
    second_side_btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let btn_checked_btn_for_value_change = e.target.innerText
            let first_side_checked_btn = document.querySelector('.checked_btn1').innerText

            if (btn_checked_btn_for_value_change != first_side_checked_btn) {
                document.querySelector('.checked_btn2').classList.remove('checked_btn2')
                e.target.classList.add('checked_btn2')
                if (secondimpt.value) {
                    apiFunc().then(res => {
                        firstImpt.value = res.rates[`${first_side_checked_btn}`]
                            /
                            res.rates[`${btn_checked_btn_for_value_change}`] * secondimpt.value
                    })
                }
                apiFunc().then(res => {
                    bottom_side_of_currency_second.innerText = `1 ${e.target.innerText}` + " = "
                        + `${(res.rates[first_side_checked_btn] / res.rates[e.target.innerText]).toFixed(4)} `
                        + `${first_side_checked_btn}`
                    bottom_side_of_currency_first.innerText = `1 ${first_side_checked_btn} `
                        + `= ` + `${(res.rates[e.target.innerText] / res.rates[first_side_checked_btn]).toFixed(4)}`
                        + `${e.target.innerText}`
                })
            } else {
                alert("change")
            }
        })
    })


    firstImpt.addEventListener('input', (e) => {
        let first_side_checked_btn = document.querySelector('.checked_btn1').innerText
        let second_side_checked_btn = document.querySelector('.checked_btn2').innerText

        if (first_side_checked_btn != second_side_checked_btn) {
            apiFunc().then((res) => {
                secondimpt.value = res.rates[`${second_side_checked_btn}`] / res.rates[`${first_side_checked_btn}`] * e.target.value;

            })
        } else {
            alert("change")
        }
    })

    secondimpt.addEventListener('input', (e) => {
        let first_side_checked_btn = document.querySelector('.checked_btn1').innerText
        let second_side_checked_btn = document.querySelector('.checked_btn2').innerText

        if (first_side_checked_btn != second_side_checked_btn) {
            apiFunc().then((res) => {
                firstImpt.value = res.rates[`${first_side_checked_btn}`] / res.rates[`${second_side_checked_btn}`] * e.target.value;
            })
        } else {
            alert("change")
        }
    })
}

//login
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
                alert("qeydiyyatdan kechdiniz")
                login_part.classList.add("deactive")
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
