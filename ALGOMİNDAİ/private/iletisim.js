

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  


  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;


   var formIletisim = {
    name: name,
    email: email,
    message: message
  };


  fetch('http://127.0.0.1:5000/iletisim', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Diğer gerektiğinde başlık eklemeleri
    },
    mode: 'cors',
    body: JSON.stringify(formIletisim),
  })
    .then(response => response.json())
    .then(data => {
      alert("Mesajınız başarıyla gönderildi!");
      console.log('Success:', data);
    })
    .catch((error) => {
      alert("Başarısız!",error.message);
    });





  document.getElementById("contactForm").reset(); // Formu sıfırla
});