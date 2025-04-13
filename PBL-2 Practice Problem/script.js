// default user credentials 

let defaultUser = {
    name: "John Doe",
    email: "john@gmail.com",
    pass: "123456"
};

function register(){
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPassword').value;

    if(!name || !email || !pass){
        alert("Please fill all fields!");
        return;
    }

    

}