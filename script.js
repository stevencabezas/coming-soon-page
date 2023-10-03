const seconds = document.querySelector(".seconds .number");
const minutes = document.querySelector(".minutes .number");
const hours = document.querySelector(".hours .number");
const days = document.querySelector(".days .number");
const email = document.querySelector(".input-box input");
const notifyBtn = document.querySelector(".input-box button");
const notification = document.querySelector(".notifications");

let secValue = 11;
let minValue = 2;
let hourValue = 1;
let dayValue = 9;

const timeFunction = setInterval(() => {
    secValue--;

    if(secValue === 0){
        minValue--;
        secValue = 60;
    }
    if(minValue === 0){
        hourValue--;
        minValue = 60;
    }
    if(hourValue === 0){
        dayValue--;
        hourValue = 24;
    }
    if(dayValue === 0){
        clearInterval(timeFunction);
    }
    seconds.textContent = (secValue < 10) ? `0${secValue}` : secValue;
    minutes.textContent = (minValue < 10) ? `0${minValue}` : minValue;
    hours.textContent = (hourValue < 10) ? `0${hourValue}` : hourValue;
    days.textContent = (dayValue < 10) ? `0${dayValue}` : dayValue;
}, 1000);

function sendEmail(e) {
    e.preventDefault();

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))){
        email.value = '';
        createToast('error');
        return;
    } 
        
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "cabezasstevenr@gmail.com",
        Password : "823B5729294D99E8F33DC7DCAC619D134FF9",
        To : email.value,
        From : 'cabezasstevenr@gmail.com',
        Subject : 'The page is already working.',
        Body : 'This is just a test to send email as a demo'
    }).then(
        createToast('success')
    );

    email.value = '';
    return true;
}

const toastDetails = {
    timer: 5000,
    success: {
        icon: "fa-solid fa-circle-check",
        text: "Success: Email sent, check your spam carpet."
    },
    error: {
        icon: "fa-solid fa-circle-xmark",
        text: "Error: Please input a valid email."
    },
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId);// Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500);// Remove the toast after 500ms
}

const createToast = (id) => {
    const { icon, text } = toastDetails[id];//Getting the icon and text for the toast based on the id passed
    console.log(icon+' '+text)
    const toast = document.createElement('li');
    toast.className = `toast ${id}`;// Setting the classes for the toast
    toast.innerHTML =    `<div class="column">
                                <i class="${icon}"></i>
                                <span>${text}</span>
                            </div>
                            <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
    notification.appendChild(toast);//Append li to ul notification
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

notifyBtn.addEventListener("click", sendEmail)