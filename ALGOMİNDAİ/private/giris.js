  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();

      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var rememberMe = document.getElementById("rememberMe").checked;

        var formLogin = {
            email: email,
            password: password,
            rememberMe: rememberMe
        };
        console.log(formLogin);


        fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Diğer gerektiğinde başlık eklemeleri
          },
          mode: 'cors',
          body: JSON.stringify(formLogin),
      })
      .then(response => response.json())
      .then(data => {
           if(data.success==false) {
            alert("Kullanıcı adı veya şifre hatalı");
           }
           else if (data.success==true) {
            window.location.href = "index.html";
           }
           else{
            console.log("sg amk");
           }
          console.log('Success:', data);
      })
      .catch((error) => {
        console.log("js error catch");
          console.error('Error:', error);    
      });


    });
  });

