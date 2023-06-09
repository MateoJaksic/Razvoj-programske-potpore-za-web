// funkcija za smanjivanje vrijednosti količine
function smanji(naziv) {
  const element = document.getElementById(naziv);
  element.textContent = parseInt(element.textContent) - 1;

  postURL('/cart/remove/' + naziv);

  if(element.textContent <= 0){
    const div = document.getElementById(element.getAttribute('ime'));
    div.remove();
  }

  const counter = document.getElementById('kosaricaCount');
  counter.textContent = parseInt(counter.textContent) - 1;

  if(parseInt(counter.textContent) == 0){
    counter.style.display = "none";
  }
}


// funkcija za povećanje vrijednosti količine
function povecaj(naziv) {
  const element = document.getElementById(naziv);
  element.textContent = parseInt(element.textContent) + 1;

  postURL('/cart/add/' + naziv);

  const counter = document.getElementById('kosaricaCount');
  counter.textContent = parseInt(counter.textContent) + 1;
}


// funkcija da dodavanje proizvoda u košaricu
function dodajUKosaricu(idTekst) {
  const element1 = document.getElementById(idTekst);
  const naziv = (element1.textContent).trim().replace(' ', '_');
  const element2 = document.getElementById("neprikazuj");
  const kategorija = parseInt(element2.textContent) + 1;
  const counter = document.getElementById('kosaricaCount');
  const brojac = document.getElementById('brojac');
  if(isNaN(brojac.textContent)){
    brojac.textContent = 0;
  }
  brojac.textContent = parseInt(brojac.textContent) + 1;
  counter.textContent = parseInt(brojac.textContent);
  const interni = document.getElementById(idTekst+'counter');
  interni.textContent = parseInt(interni.textContent) + 1
  if(interni.textContent > 0){
    interni.style.display = 'inline';
  }
  if(counter.textContent > 0){
    counter.style.display = 'inline';
  }

  postURL('/home/getProducts/' + kategorija + '/add/' + naziv);
}


// funkcija za stvaranje novog proizvoda u košarici
function stvoriDiv(naziv, kolicina) {
  naziv = naziv.replace('_', ' '); 
  const div = document.getElementById('popis');
  div.innerHTML += "<div id='" + naziv + "Div'>";

  const divdiv = document.getElementById(naziv+"Div");
  divdiv.innerHTML += "<p>" + naziv + "</p>";
  divdiv.innerHTML += "<div id='" + naziv + "Promjena'>";

  divdiv.style.gridColumn = "1/3";
  divdiv.style.display = "grid";
  divdiv.style.gridTemplateColumns = "1fr 1fr";

  const divdivdiv = document.getElementById(naziv + "Promjena");
  divdivdiv.innerHTML += `<button onclick=smanji("${naziv.replace(' ', '_')}")><img src='/images/minus.jpg'></button>`;
  divdivdiv.innerHTML += `<p id="${naziv.replace(' ', '_')}" ime="${naziv}Div">${kolicina}</p>`;
  divdivdiv.innerHTML += `<button onclick=povecaj("${naziv.replace(' ', '_')}")><img src='/images/plus.jpg'></button>`;

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
function osvjeziCart() {
  fetch('/cart/getAll')
    .then(response => response.json())
    .then( primljeno => {

      const data = primljeno.proizvodi;

      const element = document.getElementById('trenKategorija');
      element.textContent = 'Košarica';

      let suma = 0
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key];
          suma += value;
          stvoriDiv(key, value);
          getURL('/cart/create/' + key);
        }
      }
      

      if (suma > 0) {
        const value = document.getElementById('kosaricaCount');
        value.textContent = suma;
        value.style.display = "flex";
        value.style.alignItems = "center";
        value.style.justifyContent = "center";
      }

    });
}



// funkcija za osvježavanje index.html
function osvjeziIndex(proizvodi){
  proizvodi = JSON.parse(proizvodi);

  for(var i=1; i<=5; i++){
    const element = document.getElementById('p'+i);
    const naziv = (element.textContent).replace(' ', '_');

    if (proizvodi !== undefined){
      for(let key in proizvodi){
        var pamti = key;
        if(proizvodi[key] !== undefined){
          let ime = proizvodi[key].name.replace(' ', '_');
          if (ime === naziv){
            if(parseInt(proizvodi[key].value) > 0 ){
              const tekst = document.getElementById('p'+i+'counter');
              tekst.style.display = "inline";
              tekst.textContent = proizvodi[key].value;
            }
          }
        }
      }
    } else {
      const tekst = document.getElementById('p'+i+'counter');
      tekst.style.display = "none";
    }
  }

  const count = document.getElementById('kosaricaCount');
  count.textContent = parseInt(proizvodi[pamti].kosarica);
  if(count.textContent > 0){
    count.style.display = 'inline';
  }

  const broja = document.getElementById('brojac');
  brojac.textContent = parseInt(proizvodi[pamti].kosarica);
}


// funkcija za spremanje kategorije prilikom prelaska u cart.html
function spremiKategoriju() {
  const element = document.getElementById('trenKategorija');
  const naziv = element.textContent;

  localStorage.setItem('kategorija', JSON.stringify(naziv));
}


function getURL(path){
  fetch(path, {
    method: 'GET'
  })
  .then(response => {
    if (response.ok) {
      window.location.href = path;
    } 
  });
}


function postURL(path){
  fetch(path, {
    method: 'POST'
  })
  .then(response => {
    if (response.ok){}
  });
}


function odvediNaHome(){
  getURL('/home/getCategories');
}