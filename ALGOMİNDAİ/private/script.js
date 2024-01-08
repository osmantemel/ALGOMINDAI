var metin;  
var inputText=""; 
var sonuclar;

function showSuggestions() {
  console.log("script.js çalıştı");

  var dropdown = document.getElementById("kategori");
  var secilenDeger = dropdown.options[dropdown.selectedIndex].value;
  console.log("Seçilen kategori: " + secilenDeger);

  var myButton = document.getElementById("btn");
  myButton.innerHTML = '<div class="spinner-grow" role="status" style=" height: 21px; color: white;"><span class="visually-hidden"></span>  </div>';
  inputText = document.getElementById("searchInput").value;
 
  if (inputText.trim() === "") {
    alert("Lütfen en az bir kelime giriniz!");
    myButton.innerHTML = "ARAMA";
  }  

  // document.getElementById("h5").innerHTML=inputText +" kelimeleri ile ilgili olabilecek NickNameler ?"
  
  inputText = "(" + inputText + ")parantez içinde yazan kelimeleri kullanarak bana 5 tane "+ secilenDeger+ " kategorisinde  nickname önerirmisin not:sadece önereceğin kullanıcı isimlerini yaz başka hiçbir kelime yazma";

  data={
    "text": inputText,
  }

      fetch('http://127.0.0.1:5000/receive_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        mode: 'cors',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      var a=data.response;
      var ayrilanVeri = a.split('. ');

      
      var sonucDizi = ayrilanVeri.slice(0, 6);

      console.log(sonucDizi[0]);
      console.log(sonucDizi[1]);
      console.log(sonucDizi[2]);
      console.log(sonucDizi[3]);
      console.log(sonucDizi[4]);
      console.log(sonucDizi[5]);
      sonuclar=sonucDizi;
      bekleVeCevapVer();
        // console.log('Success:', data);
    })
    .catch((error) => {
        //console.error('Error:', error);
        alert("HATA ERROR");
    });
}

async function bekleVeCevapVer() {
  await bekle(5000);
  alert("Bekleme süresi bitti, şimdi cevap veriyorum!");

  var icerik = document.getElementById("icerik");
  var icerik1 = document.getElementById("card1");
  var icerik2= document.getElementById("card2");
  var icerik3= document.getElementById("card3");
  var icerik4 = document.getElementById("card4");
  var icerik5 = document.getElementById("card5");
  // icerik.innerHTML = '<div class="container d-flex justify-content-center mt-5" style="height: 100vh;"><div class="row"><div class="col-md-6"><div class="card custom-card"><div class="card-body cards">İlk Kart</div><i class="far fa-thumbs-up like-icon" onclick="toggleLike(this)"></i><i class="far fa-heart favorite-icon" onclick="toggleFavorite(this)"></i></div></div></div></div>';
  icerik1.innerHTML = sonuclar[1];
  icerik2.innerHTML = sonuclar[2];
  icerik3.innerHTML = sonuclar[3];
  icerik4.innerHTML = sonuclar[4];
  icerik5.innerHTML = sonuclar[5];
  icerik.style.display = 'flex';

  
  var myButton = document.getElementById("btn");
  myButton.innerHTML = "İSİM ÖNER";7
}

function bekle(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function splitAndFilterByNumbers(text) {
    var parts = text.split(/[0-9]+\./);
    return parts;
}

function toggleLike(icon) {
  icon.classList.toggle('fas'); // 'far' class'ını ekleyip kaldırarak içini dolu yapma
}

function toggleFavorite(icon) {
  icon.classList.toggle('fas'); // 'far' class'ını ekleyip kaldırarak içini dolu yapma
}
