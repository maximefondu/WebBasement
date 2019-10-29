//FETCH
fetch('assets/content.json')
.then(result =>{
    return result.json();
})
.then(data =>{
   createHeader(data);
   slider(data);
   switchBg(data);
});


//createElement
const header = document.querySelector('.header');
const headerBg = document.querySelectorAll('.header__bgEl');

function createHeader(data){
   let id = 0;
   createBackground(data, id, headerBg);
   let content = createDiv(header, 'header__content');
   let contentDate = createDiv(header, 'header__dateBlock');

   let span = createSpan(content, 'header__spanTitle');
   title = createH2(data, id, span, '');
   span = createSpan(contentDate, 'header__span');
   createP(data, id, span, 'header__city', 'city');
   span = createSpan(contentDate, 'header__span')
   createP(data, id, span, 'header__date', '');
   createBtn(content, 'header__btn', 'Découvrir');
}

//changed BG
function switchBg(data){
   let btnChanged = document.querySelector('.header__btn');
   btnChanged.addEventListener('click', (e)=>{
      header.classList.add('header--actived');

      let id = headerBg[0].getAttribute('data-id');
      setTimeout(function(){
         createBackgroundNext(data, id);
         header.classList.remove('header--actived');
      }, 3000);

      sound();
   });
}


let audio = new Audio;
let audio2 = new Audio;
let audio3 = new Audio;
let audio4 = new Audio;
let audio5 = new Audio;
//SOUND
function sound(){
   link = ['courtcircuit.mp3', 'élécrocution.mp3', 'interférences.mp3', 'orage.mp3', 'sonsourd.mp3'];

   audio.src='../assets/audios/'+link[0];
   audio.play();

   audio2.src='../assets/audios/'+link[1];
   audio2.play();

   audio3.src='../assets/audios/'+link[2];
   audio3.play();

   audio4.src='../assets/audios/'+link[3];
   audio4.play();

   audio5.src='../assets/audios/'+link[4];
   audio5.play();

}


let boolean = false;
//sound
let btnSound = document.querySelector('.header__sound');
btnSound.addEventListener('click', (e)=>{
   if (boolean == false) {
      audio.muted=true;
      audio2.muted=true;
      audio3.muted=true;
      audio4.muted=true;
      audio5.muted=true;
      boolean = true;
   }else{
      audio.muted=false;
      audio2.muted=false;
      audio3.muted=false;
      audio4.muted=false;
      audio5.muted=false;
   }
});



//SLIDER
let ul = document.querySelector('.header__nav');
function slider(data){
   for (let i = 0; i < data.projets.length; i++) {
      let li = createLi(ul, 'header__el');
      let btn = createBtn(li, 'header__btnNav', i);
      sliderNext(data, btn, i);
   }
}

function sliderNext(data, btn, i){
   btn.addEventListener('click', (e)=>{

      let dd = document.querySelector('.header__div');
      if (dd) {
         dd.remove();
      }else{
         let div = createDiv(header, '');
         div.style.backgroundImage='url(assets/'+data.projets[i].bg+')';
         div.classList.add('header__div');
         div.addEventListener('animationend', (e)=>{
            createBackground(data, i);
            div.remove();
         })
         setTimeout(function(){
            let title = document.querySelector('.title')
            title.classList.add('title--act');
            let city = document.querySelector('.header__city')
            city.classList.add('header__city--an');
            let date = document.querySelector('.header__date')
            date.classList.add('header__date--an');
         }, 500);
         setTimeout(function(){
            let title = document.querySelector('.title')
            title.innerHTML=data.projets[i].name;
            title.setAttribute('data-text', data.projets[i].name);
            title.classList.remove('title--act');
            let city = document.querySelector('.header__city')
            city.innerHTML=data.projets[i].city;
            city.classList.remove('header__city--an');
            city.setAttribute('data-text', data.projets[i].city);
            let date = document.querySelector('.header__date')
            date.innerHTML=data.projets[i].date;
            date.classList.remove('header__date--an');
            date.setAttribute('data-text', data.projets[i].date);
      }, 1000);
      }
   });
}




function createBackground(data, id){   
   headerBg[0].setAttribute('data-id', id);

   let retina = isRetina();

   let ext = data.projets[id].bg.slice(-4)

   if (retina == true) {
      for (let i = 0; i < headerBg.length; i++) {
         headerBg[i].style.backgroundImage='url(assets/'+data.projets[id].bg.slice(0, -4)+'@2x'+ext+')';
      }
   }else{
      for (let i = 0; i < headerBg.length; i++) {
         headerBg[i].style.backgroundImage='url(assets/'+data.projets[id].bg+')';
      }
   }
}

function createBackgroundNext(data, id){   
   for (let i = 0; i < headerBg.length; i++) {
      headerBg[i].style.backgroundImage='url(assets/'+data.projets[id].bg_next+')';
      headerBg[i].setAttribute('data-id', id);
   }
}

function createH2(data, id, content, nameClass){
   let title = document.createElement('h2');

   title.innerHTML=data.projets[id].name;
   title.setAttribute('data-text', data.projets[id].name);

   content.appendChild(title);

   if (nameClass) {
      title.classList.add('title', nameClass);
   }else{
      title.classList.add('title');
   }

   return title;
}

function createBtn(content, nameClass, text){
   let btn = document.createElement('button');

   btn.innerHTML=text;

   content.appendChild(btn);

   if (nameClass) {
      btn.classList.add(nameClass);
   }
   return btn;
}
function createDiv(content, nameClass){
   let div = document.createElement('div');

   content.appendChild(div);

   if (nameClass) {
      div.classList.add(nameClass);
   }

   return div;
}

function createSpan(content, nameClass){
   let span = document.createElement('span');

   content.appendChild(span);

   if (nameClass) {
      span.classList.add(nameClass);
   }

   return span;
}

function createP(data, id, content, nameClass, text){
   let p = document.createElement('p');

   p.setAttribute('data-text', data.projets[id].date);

   if (text == 'city') {
      p.innerHTML=data.projets[id].city;
   }else{
      p.innerHTML=data.projets[id].date;
   }

   content.appendChild(p);

   if (nameClass) {
      p.classList.add(nameClass);
   }
}

function createLi(content, nameClass){
   let li = document.createElement('li');

   content.appendChild(li);

   if (nameClass) {
      li.classList.add(nameClass);
   }

   return li;
}

function isRetina() {
   var mediaQuery = "(-webkit-min-device-pixel-ratio: 2)";
 
   if (window.devicePixelRatio > 1)
      return true;
 
   if (window.matchMedia && window.matchMedia(mediaQuery).matches)
      return true;
 
   return false;
};