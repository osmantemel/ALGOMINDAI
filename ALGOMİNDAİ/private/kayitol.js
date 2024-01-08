function submitForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;

    document.getElementById("registrationForm").reset(); // Formu sıfırla


    var formRegister = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password
    };

    console.log(formRegister);

    fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Diğer gerektiğinde başlık eklemeleri
        },
        mode: 'cors',
        body: JSON.stringify(formRegister),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    alert("Kayit başarılı");
    window.location.href = "giris.html";
}
