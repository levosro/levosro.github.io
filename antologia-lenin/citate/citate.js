import { citate } from './citate.mjs';
import { chapters } from '../msj/chapters.mjs';
import { texts } from '../msj/texts.mjs';
import { parts } from '../msj/parts.mjs';
import { notes } from '../msj/notes.mjs'
// import { notes } from '../msj/notes.mjs';
const section = document.querySelector('.container');



let currentItem = Math.floor(Math.random() * citate.length);

window.addEventListener("DOMContentLoaded", function () {
  let x = location.search.split('cit=')[1];
  if (x != undefined) {

    section.innerHTML = `<div class="title"> <h2>Citate din scrierile lui Lenin</h2> <div class="underline"> </div> </div> <div class="review"> <div class="img-container"> </div> <h4 id="author"></h4> <p id="titlu"></p> <p id="an"></p> <p id="info"></p> <div class="button-container"> <button class="prev-btn"> <i class="fas fa-chevron-left"></i> </button> <button class="next-btn"> <i class="fas fa-chevron-right"></i> </button> </div> <button class="random-btn">Surprinde-mă</button> <div></div> <button class="expand-btn" id="antologia">Antologia Lenin</button> <div></div> <button class="expand-btn" id="home">Levos Homepage</button>`;

    const antologia = document.getElementById('antologia');

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const randomBtn = document.querySelector('.random-btn');
    const home = document.getElementById('home');

    home.addEventListener('click', function () {
      window.location.href = '../index.html'
    })
    if (parseInt(x) > citate.length - 1 || parseInt(x) < 0) {
      let citat = citate[currentItem]
      window.location.href = `./citate.html?cit=${citat.id}`;
    }
    try {
      let citat = citate.filter(item => item.id == parseInt(x))[0]
      currentItem = citat.id;
      changePerson(currentItem);
      generateTOC();
    } catch (TypeError) {
      let citat = citate[currentItem]
      window.location.href = `./citate.html?cit=${citat.id}`;
    }

    antologia.addEventListener("click", function () {
      window.location.href = './index.html';
    })
    prevBtn.addEventListener('click', function () {
      if (currentItem == 0) {
        currentItem = citate.length - 1;
      }
      else {
        currentItem--;
      }
      let citat = citate[currentItem]
      window.location.href = `./citate.html?cit=${citat.id}`;
    });

    nextBtn.addEventListener('click', function () {
      if (currentItem == citate.length - 1) {
        currentItem = 0;
      }
      else {
        currentItem++;
      }
      let citat = citate[currentItem]
      window.location.href = `./citate.html?cit=${citat.id}`;
    });

    randomBtn.addEventListener('click', function () {
      let x = currentItem;
      while (currentItem == x) { currentItem = Math.floor(Math.random() * citate.length); }
      let citat = citate[currentItem]
      window.location.href = `./citate.html?cit=${citat.id}`;
    });
  }
  else {
    let citat = citate[currentItem]
    window.location.href = `./citate.html?cit=${citat.id}`;
  }
});



function changePerson(person) {
  const img = document.querySelector('.img-container');
  const author = document.getElementById('author');
  const titlu = document.getElementById('titlu');
  const info = document.getElementById('info');
  const an = document.getElementById('an');

  const item = citate[person];
  img.innerHTML = "<img src=\"./citate/profiles/" + item.img + ".svg\" id=\"person-img\" alt=\"\">";
  author.innerHTML = item.autor;
  titlu.innerHTML = item.titlu;
  info.innerHTML = item.text;
  if (!item.titlu.includes(["Scrisoare către", "Cuvântare"])) {
    an.innerHTML = item.an;
  }
  else {
    an.innerHTML = null;
  }
}

function Search2() {
  const input = document.getElementById('textInput');
  input.addEventListener("keyup", function () {
    const search = document.getElementById("search");
    let filter = input.value.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    if (filter != '') {
      let toc = document.getElementById("toc");
      // console.log(toc)
      toc.style.display = "none";
    }
    else {
      let toc = document.getElementById("toc");
      toc.style.display = "";
    }
    const textList = search.getElementsByTagName("menuitem");
    // let x = textList.shift();
    for (let i = 0; i < textList.length; i++) {
      const aX = textList[i].getElementsByTagName("a")[0]
      // console.log(textList)
      let a = aX.getAttribute("id");
      let content = ''
      if (a.includes('CHR')) {
        a = a.substring(3)
        // console.log(a)
        let text = texts.filter(element => element.idChr == a)[0];
        // console.log(text);
        let contentList = text.content.filter(element => !element.includes('<h'));
        content = contentList.join(" ").normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '');
        let notesListX = [...text.content.join(" ").matchAll(/\>\[[\d]+\]\</g)];
        let notesList = []
        notesListX.forEach(function (item) {
          item = item[0];
          item = parseInt(item.substring(2, item.length - 2));
          // console.log(item);
          notesList.push(notes[item - 1])
        })
        notesList.forEach(function (note) {
          content = content + note.content.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '');
        })
      }
      else {
        let x = parseInt(a.substring(3))
        let citat = citate.filter(item => item.id == x)[0]
        content = content + citat.text.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '');
      }
      if (filter != '') {
        if (content.toUpperCase().indexOf(filter) > -1) {
          textList[i].style.display = "";
          const aX = textList[i].getElementsByTagName("a")[0]
          let a = aX.getAttribute("id");
          if (content.toUpperCase().indexOf(filter) >= 0) {
            let j = content.toUpperCase().indexOf(filter);
            let res = ''
            if (j > 20) { res = '<i>„...' + content.substring(j - 20, j) + `<b><u>${content.substring(j, j + filter.length)}</b></u>` + content.substring(j + filter.length, j + filter.length + 20) + '...“</i>'; }
            else if (j == 0) { res = '<i>„' + `<b><u>${content.substring(j, j + filter.length)}</b></u>` + content.substring(j + filter.length, j + filter.length + 25) + '...“</i>'; }
            else { res = '<i>„' + content.substring(0, j) + `<b><u>${content.substring(j, j + filter.length)}</b></u>` + content.substring(j + filter.length, j + filter.length + 20) + '...“</i>'; }
            if (a.includes('CHR')) {
              let text = texts.filter(element => element.idChr == a.substring(3))[0];
              const div = document.getElementById(`chr${text.idChr}`);
              div.innerHTML = res;
              div.innerHTML = res;
            } else {
              let citat = citate.filter(element => element.id == parseInt(a.substring(3)))[0];
              const div = document.getElementById(`cit${citat.id}`);
              div.innerHTML = res;
            }
          }

        } else {
          textList[i].style.display = "none";
          const aX = textList[i].getElementsByTagName("a")[0]
          let a = aX.getAttribute("id");
          if (a.includes('CHR')) {
            let text = texts.filter(element => element.idChr == a.substring(3))[0];
            const div = document.getElementById(`chr${text.idChr}`);
            div.innerHTML = '';
            div.innerHTML = '';
          } else {
            let citat = citate.filter(element => element.id == parseInt(a.substring(3)))[0];
            const div = document.getElementById(`cit${citat.id}`);
            div.innerHTML = '';
          }
        }
      }
      else {
        textList[i].style.display = "none";
      }
    }

  })
}



function generateTOC() {
  const form = document.getElementById("form");
  // form2 = document.getElementById("form2");
  let res = ''
  res = res + '<input id="left-menu" type="checkbox"> <input id="left-menu-reset" type="reset"> <nav class="left-navigation"> <main> <label class="menu-toggle" for="left-menu"><span>&nbsp;</span></label> <label class="menu-close" for="left-menu-reset"><span>&nbsp;</span></label> <menu>';
  res = res + '<div id="search">';
  res = res + '<div id="searchTextInput"><input type="text" id="textInput" placeholder="Search"><i class="fa-solid fa-magnifying-glass"></i></div>';

  for (let p = 0; p < texts.length; p++) {
    let text = texts[p];
    // console.log(text)
    if (text.title != '' || text.info.indexOf(text.title) == 0) { res = res + `<menuitem> <span><a href="./index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">${text.info}: <b>${text.title}</b></a><hr style="width:30%;"/><div id="chr${text.idChr}"></div></span> </menuitem>`; }
    else {
      res = res + `<menuitem> <span><a href="./index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">${text.info}</a><hr style="width:30%;"/><div id="chr${text.idChr}"></div></span> </menuitem>`;
    }
  }
  for (let p = 0; p < citate.length; p++) {
    let citat = citate[p];
    res = res + `<menuitem> <span><a href="./citate.html?cit=${citat.id}" id="CIT${citat.id}">${citat.autor}, ${citat.titlu.replace(/(<[a|A][^>]*>|)/g, '')}</a><hr style="width:30%;"/><div id="cit${citat.id}"></div></span> </menuitem>`;
  }
  res = res + '</div>'

  // res = res + '<nav class="left-navigation"> <main>'
  // res = res + '<menu><main><nav>'
  res = res + '<div id="toc">'
  // res = res + '<input id="left-menu" type="checkbox"> <input id="left-menu-reset" type="reset"> <nav class="left-navigation"> <main> <label class="menu-toggle" for="left-menu"><span>&nbsp;</span></label> <label class="menu-close" for="left-menu-reset"><span>&nbsp;</span></label> <menu>';
  let citItem = Math.floor(Math.random() * citate.length);
  res = res + `<menuitem><menuitem> <span class="heading"><a href="./citate.html?cit=${citItem}" id="a0.0">Citate din scrierile lui Marx și Engels</a></span> </menuitem>`;
  res = res + '<menuitem><menuitem> <span class="heading"><a href="./index.html" id="A0.0">Antologia Marx-Engels</a></span> </menuitem>';
  res = res + `<menuitem> <span><a href="./index.html?id=0.01">${chapters[0].title}</a></span> </menuitem>`;
  res = res + `<menuitem> <span><a href="./index.html?id=0.02">${chapters[1].title}</a></span> </menuitem>`;
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    res = res + `<menuitem> <label for="left-menu-item-${i + 1}"><a href="./index.html?id=P${part.idPt}" id="a${part.idPt}">${part.title}</a></label> <input id="left-menu-item-${i + 1}" type="checkbox"> <nav> <main> <label class="menu-toggle" for="left-menu-item-${i + 1}"><span>&nbsp;</span></label> <menu>`;
    res = res + `<menuitem> <span class="heading"><a href="./index.html?id=P${part.idPt}" id="A${part.idPt}">${part.title}</a></span> </menuitem>`;
    let listCh = []
    for (let j = 0; j < chapters.length; j++) {
      let chapter = chapters[j]
      if (part.idPt.indexOf(chapter.idCh[0]) == 0) {
        // console.log(chapter)
        listCh.push(chapter);
      }
    }
    // console.log(listCh)
    for (let j = 0; j < listCh.length; j++) {
      let chapter = listCh[j];
      res = res + `<menuitem> <label for="left-menu-item-${i + 1}-${j + 1}"><a href="./index.html?id=C${chapter.idCh}" id="aC${chapter.idCh}">${chapter.title}</a></label> <input id="left-menu-item-${i + 1}-${j + 1}" type="checkbox"> <nav> <main> <label class="menu-toggle" for="left-menu-item-${i + 1}-${j + 1}"><span>&nbsp;</span></label> <menu> <menuitem> <span class="heading"><a href="./index.html?id=C${chapter.idCh}" id="AC${chapter.idCh}">${chapter.title}</a></span> </menuitem>`;
      // res = res + `<menuitem> <span class="heading">${chapter.title}</span> </menuitem>`;
      let listTx = [];
      for (let p = 0; p < texts.length; p++) {
        let text = texts[p];
        if (text.idChr.indexOf(chapter.idCh) == 0) {
          listTx.push(text);
        }
      }
      // console.log(listTx)
      for (let p = 0; p < listTx.length; p++) {
        let text = listTx[p];
        // console.log(text)
        if (text.title != '') { res = res + `<menuitem> <span><a href="./index.html?id=T${text.idChr}#${text.idChr}" id="aCh${text.idChr}">${text.title}</a></span> </menuitem>`; }
        else {
          res = res + `<menuitem> <span><a href="./index.html?id=T${text.idChr}#${text.idChr}" id="aCh${text.idChr}">${text.info}</a></span> </menuitem>`;
        }
      }
      res = res + '</menu></main></nav></menuitem>';

    }
    res = res + '</menu></main></nav></menuitem>';
  }
  res = res + `</div></menu></main></nav>`;
  if (window.innerWidth > 350) {
    form.innerHTML = res;
    const search = document.getElementById("search");

    let textList = search.getElementsByTagName("menuitem");
    for (let i = 0; i < textList.length; i++) {
      textList[i].style.display = "none";
    }
    Search2();
  }
}