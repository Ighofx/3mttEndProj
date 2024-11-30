async function registerUser() {

const firstName=document.getElementById("firstName").value;
const password= document.getElementById("password").value;
const lastName=document.getElementById("firstName").value;
const email=document.getElementById("email").value;
const responseParagraph = document.getElementById("response")



try {
    const response = await fetch("/api/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            })
        }
    );
    const data = await response.json();

    if (response.ok) {
       responseParagraph.innerText = `${data.message}`
       console.log(data);
       setTimeout(() => {
        console.log("Redirecting to / home page...");
        window.location.assign("/home.html")
       }, 5000
       )

    } else {
        responseParagraph.innerText = `${data.message}`
       console.log(data);
       
    }
} catch(error) {
    console.log(error); 
}

}

submit= document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
    document.getElementById("loginForm").reset();
    });
