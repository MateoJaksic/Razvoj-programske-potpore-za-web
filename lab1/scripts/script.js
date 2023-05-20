// funkcija za promjenu kategorije u index.html
function promjeniKategoriju(kategorija){

  const element = document.getElementById('trenKategorija');
  element.textContent = kategorija;

  for(var i=0; i<10; i++){
    if(kategorija === data.categories[i].name){
      var id = i;
    }
  }

  const slika1Img = document.getElementById('img1');
  slika1Img.setAttribute('src', data.categories[id].products[0].image);
  const slika1P = document.getElementById('p1');
  slika1P.textContent = data.categories[id].products[0].name;

  const slika2Img = document.getElementById('img2');
  slika2Img.setAttribute('src', data.categories[id].products[1].image);
  const slika2P = document.getElementById('p2');
  slika2P.textContent = data.categories[id].products[1].name;

  const slika3Img = document.getElementById('img3');
  slika3Img.setAttribute('src', data.categories[id].products[2].image);
  const slika3P = document.getElementById('p3');
  slika3P.textContent = data.categories[id].products[2].name;

  const slika4Img = document.getElementById('img4');
  slika4Img.setAttribute('src', data.categories[id].products[3].image);
  const slika4P = document.getElementById('p4');
  slika4P.textContent = data.categories[id].products[3].name;

  const slika5Img = document.getElementById('img5');
  slika5Img.setAttribute('src', data.categories[id].products[4].image);
  const slika5P = document.getElementById('p5');
  slika5P.textContent = data.categories[id].products[4].name;

  osvjeziIndex();
};



// funkcija za smanjivanje vrijednosti količine
function smanji(naziv) {
  const element = document.getElementById(naziv);
  element.textContent = parseInt(element.textContent) - 1;

  const storedObject = JSON.parse(localStorage.getItem(element.getAttribute('ime')));
  storedObject.kolicina = storedObject.kolicina - 1;
  localStorage.setItem(element.getAttribute('ime'), JSON.stringify(storedObject));

  if(storedObject.kolicina <= 0){
    const div = document.getElementById(element.getAttribute('ime'));
    div.remove();
    localStorage.removeItem(element.getAttribute('ime'))
  }

  azuriraj();
}



// funkcija za povećanje vrijednosti količine
function povecaj(naziv) {
  const element = document.getElementById(naziv);
  element.textContent = parseInt(element.textContent) + 1;

  const storedObject = JSON.parse(localStorage.getItem(element.getAttribute('ime')));
  storedObject.kolicina = storedObject.kolicina + 1;
  localStorage.setItem(element.getAttribute('ime'), JSON.stringify(storedObject));

  azuriraj();

}



// funkcija da dodavanje proizvoda u košaricu
var polje = [];
function dodajUKosaricu(idTekst) {
  const element = document.getElementById(idTekst);
  const naziv = element.textContent;

  const storedObject = JSON.parse(localStorage.getItem(naziv));
  if(storedObject !== null) {
    storedObject.kolicina = storedObject.kolicina + 1;
    localStorage.setItem(naziv, JSON.stringify(storedObject));
  }
  else {
    const objekt = {
      naziv: naziv,
      kolicina: 1
    };

    polje.push(naziv);
    localStorage.setItem(naziv, JSON.stringify(objekt));
  }
  osvjeziIndex();
}



// funkcija za stvaranje novog proizvoda u košarici
function stvoriDiv(naziv, kolicina) {
  var div = document.getElementById('kosarica');
  div.innerHTML += "<div id='" + naziv + "'>";

  var divdiv = document.getElementById(naziv);
  divdiv.innerHTML += "<p>" + naziv + "</p>";
  divdiv.innerHTML += "<div id='" + naziv + "Promjena'>";

  divdiv.style.gridColumn = "1/3";
  divdiv.style.display = "grid";
  divdiv.style.gridTemplateColumns = "1fr 1fr";

  var divdivdiv = document.getElementById(naziv + "Promjena");
  divdivdiv.innerHTML += `<button onclick=smanji("${naziv.replace(/\s+/g, '')}Kolicina")><img src='images/minus.jpg'></button>`;
  divdivdiv.innerHTML += `<p id="${naziv.replace(/\s+/g, '')}Kolicina" ime="${naziv}">${kolicina}</p>`;
  divdivdiv.innerHTML += `<button onclick=povecaj("${naziv.replace(/\s+/g, '')}Kolicina")><img src='images/plus.jpg'></button>`;

  divdivdiv.style.display = "flex";
  divdivdiv.style.flexWrap = "nowrap";
  divdivdiv.style.justifyContent = "center";
  divdivdiv.getElementsByTagName("button")[0].style.border = "none";
  divdivdiv.getElementsByTagName("button")[1].style.border = "none";
  divdivdiv.getElementsByTagName("img")[0].style.maxWidth = "2vw";
  divdivdiv.getElementsByTagName("img")[0].style.maxHeight = "2vw";
  divdivdiv.getElementsByTagName("img")[0].style.alignSelf = "center";
  divdivdiv.getElementsByTagName("img")[1].style.maxWidth = "2vw";
  divdivdiv.getElementsByTagName("img")[1].style.maxHeight = "2vw";
  divdivdiv.getElementsByTagName("img")[1].style.alignSelf = "center";
 
  divdivdiv.innerHTML += "</div>";
  divdiv.innerHTML += "</div>";
}



// funkcija za osvježavanje cart.html
function osvjeziCart(){
  const kategorija = JSON.parse(localStorage.getItem('kategorija'));
  const element = document.getElementById('trenKategorija');
  element.textContent = kategorija;
  for(var i=0; i<10; i++){
    for(var j=0; j<5; j++){
      const storedObject = JSON.parse(localStorage.getItem(data.categories[i].products[j].name));
      if(storedObject !== null && storedObject.kolicina > 0) {
        stvoriDiv(storedObject.naziv, storedObject.kolicina);
        localStorage.setItem(storedObject.naziv, JSON.stringify(storedObject))
      }
    }
  }

  const suma = localStorage.getItem('kosarica');
  if (suma > 0){
    const value = document.getElementById('kosaricaCount');
    value.textContent = suma;
    value.style.display = "flex";
    value.style.alignItems = "center";
    valuestyle.justifyContent = "center";
  }
}



// pomocna funkcija
function ispis(){
  for(var i=0; i<10; i++){
    for(var j=0; j<5; j++){
      const storedObject = JSON.parse(localStorage.getItem(data.categories[i].products[j].name));
      if(storedObject !== null) {
        console.log(storedObject) 
      }
    }
  }
}




// funkcija za osvježavanje index.html
function osvjeziIndex(){
  for(var i=1; i<=5; i++){
    const element = document.getElementById('p'+i);
    const naziv = element.textContent;

    const storedObject = JSON.parse(localStorage.getItem(naziv));
    if (storedObject !== null){
      if (storedObject.kolicina > 0){
        const tekst = document.getElementById('pcounter'+i);
        tekst.style.display = "flex";
        tekst.style.alignItems = "center";
        tekst.style.justifyContent = "center";
        tekst.textContent = storedObject.kolicina;
      }
    } else {
      const tekst = document.getElementById('pcounter'+i);
      tekst.style.display = "none";
    }
  }

  azuriraj();

}



// funkcija za spremanje kategorije prilikom prelaska u cart.html
function spremiKategoriju() {
  const element = document.getElementById('trenKategorija');
  const naziv = element.textContent;

  localStorage.setItem('kategorija', JSON.stringify(naziv));
}


function azuriraj() {
  var suma = 0;

  for(var i=0; i<10; i++){
    for(var j=0; j<5; j++){
      const storedObject = JSON.parse(localStorage.getItem(data.categories[i].products[j].name));
      if (storedObject !== null){
        if (storedObject.kolicina > 0){
          suma += storedObject.kolicina;
        }
      }
    }
  }

  const kosarica = document.getElementById('kosaricaCount');
  kosarica.textContent = suma;
  localStorage.setItem('kosarica', JSON.stringify(suma));

  if (kosarica.textContent > 0){
    kosarica.style.display = "flex";
    kosarica.style.alignItems = "center";
    kosarica.style.justifyContent = "center";
  } else {
    kosarica.style.display = "none";
  }
}

