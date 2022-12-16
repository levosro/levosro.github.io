/* eslint-disable no-useless-escape */
/* eslint-disable no-irregular-whitespace */
import { chapters } from './msj/chapters.mjs';
import { texts } from './msj/texts.mjs';
import { parts } from './msj/parts.mjs';
import { notes } from './msj/notes.mjs';
// import { citate } from './citate/citate.mjs';

class ExpandedButton {
  constructor(title, idChr, index) {
    this.title = title;
    this.idChr = idChr;
    this.index = index;
    this.expanded = false;
  }
  toString() {
    return `<section class="container"> <button class="expand-btn" id="${this.idChr}">${this.title}</button> </section>\n<div id="content${this.idChr}"></div>`;
  }
}

const synth = window.speechSynthesis;
// let utterThis = new SpeechSynthesisUtterance()
// setTimeout(() => {
//   console.log(window.speechSynthesis.getVoices().filter(item => item.lang.includes('ro'))[0]);
// }, 5000);
// utterThis.voice = synth.getVoices().filter(item => item.lang.includes('ro'))[0]

const author = document.getElementById('author');
const titlu = document.getElementById('titlu');
const info = document.getElementById('info');
const contents = document.getElementById('contents');
const part = document.getElementById('part');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
// const modalClose = document.querySelector(".modal-close");

// const modalClose = document.querySelectorAll('.modal-close');
// const expandBtn = document.querySelector('.expand-btn');



let chTexts = [];
let btnList = [];
let currentItem = 2;

document.addEventListener('copy', (event) => {
  if (event == null) {
    return;
  }
  let selection = document.getSelection();
  if (selection.toString() != '') {
    event.clipboardData.setData('text/plain', `${selection.toString()}\n\n${window.location.href}`);
    event.preventDefault();
  }
})

window.addEventListener("DOMContentLoaded", function () {
  let myPromise = new Promise(function (myResolve, myReject) {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
      myResolve(voices);
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", function () {
        voices = window.speechSynthesis.getVoices();
        myResolve(voices);
      });
    }
  });

  myPromise.then(
    function (value) {
      let x = location.search.split('id=')[1];
      if (x != undefined) {
        document.querySelector('header').innerHTML = '<form id="form1" action="javascript:"></form>'
        const container = document.getElementById('container');
        container.innerHTML = `<div class="review"> <div class="button-container"> <button class="prev-btn"> <i class="fas fa-chevron-left"></i> </button> <button class="next-btn"> <i class="fas fa-chevron-right"></i> </button> </div> <button class="random-btn"><i class="fa fa-random"></i> Surprinde-mă</button> <div></div> <button class="expand-btn" id="home"><i class="fa fa-home"></i> Levos Homepage</button>`

        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const randomBtn = document.querySelector('.random-btn');
        const home = document.getElementById('home');

        home.addEventListener('click', function () {
          window.location.href = '../index.html'
        })
        prevBtn.addEventListener('click', function () {
          if (currentItem == 0) {
            currentItem = chapters.length - 1;
          }
          else {
            currentItem--;
          }
          const chapter = chapters[currentItem]
          window.location.href = `./index.html?id=C${chapter.idCh}`;
        });

        nextBtn.addEventListener('click', function () {
          if (currentItem == chapters.length - 1) {
            currentItem = 0;
          }
          else {
            currentItem++;
          }
          const chapter = chapters[currentItem]
          window.location.href = `./index.html?id=C${chapter.idCh}`;
          // changeChapter(currentItem);
        });

        randomBtn.addEventListener('click', function () {
          let x = currentItem
          currentItem = Math.floor(Math.random() * chapters.length);
          while (currentItem == x) {
            currentItem = Math.floor(Math.random() * chapters.length);
          }
          const chapter = chapters[currentItem]
          window.location.href = `./index.html?id=C${chapter.idCh}`;
        });

        document.querySelector('#TOC').setAttribute('display', 'none')

        try {
          if (x.includes('C')) {
            let c = x.split('C')[1]
            let chapter = chapters.filter(element => element.idCh.indexOf(c) == 0)[0];
            currentItem = chapters.indexOf(chapter);
            changeChapter(currentItem);
            generateTOC();
            let btnX = btnList.filter(element => element.idChr == c)[0]
            let k = btnList.indexOf(btnX)
            let text = texts.filter(element => element.idChr == c)[0];
            openButton(text, btnX, k);
          }
          else if (x.includes('P')) {
            let c = x.split('P')[1]
            let chapter = chapters.filter(element => element.idCh.indexOf(c) == 0)[0];
            currentItem = chapters.indexOf(chapter);
            changeChapter(currentItem);
            generateTOC();
          }
          else if (x.includes('T')) {
            let t = x.split('T')[1]
            let text = texts.filter(element => element.idChr == t)[0];
            let chapter = chapters.filter(element => text.idChr.includes(element.idCh))[0];
            currentItem = chapters.indexOf(chapter);
            changeChapter(currentItem);
            generateTOC();
            let btnX = btnList.filter(element => element.idChr == t)[0]
            let k = btnList.indexOf(btnX)
            openButton(text, btnX, k);
            // Search2();
          }
          else {
            let x = currentItem
            currentItem = Math.floor(Math.random() * chapters.length);
            while (currentItem <= 2 && currentItem != x) {
              currentItem = Math.floor(Math.random() * chapters.length);
            }
            const chapter = chapters[currentItem]
            window.location.href = `./index.html?id=C${chapter.idCh}`;
          }
        } catch (TypeError) {
          let x = currentItem
          currentItem = Math.floor(Math.random() * chapters.length);
          while (currentItem <= 2 && currentItem != x) {
            currentItem = Math.floor(Math.random() * chapters.length);
          }
          const chapter = chapters[currentItem]
          window.location.href = `./index.html?id=C${chapter.idCh}`;
        }
        let target = window.location.href.split('#')[1];
        // console.log(target)
        if (target != undefined) {
          let textElement = document.querySelector('.titlu')
          if (target.includes('cit')) { textElement = document.querySelector(`a#${target}`) }
          else {
            textElement = document.getElementById(target)
          }
          textElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
      else {
        const bookContent = document.getElementById('bookContent');
        bookContent.setAttribute('display', 'none');
        // const container = document.getElementById('container');
        // container.setAttribute('display', 'none');
        let res = ''
        res = res + '<div id="searchTOC">';
        res = res + '<div></div> <center><button class="expand-btn" id="download"><i class="fa fa-file-download"></i> Download EPUB</button><div></div><button class="expand-btn" id="home"><i class="fa fa-home"></i> Levos Homepage</button></center>';
        res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody> <tr> <td><div id="searchTextInput"><input type="text" id="textInput2" placeholder="Search"></div></td></tr></tbody></table><tbody><table style="width: 50%; margin-left: auto; margin-right: auto;">';


        for (let p = 0; p < texts.length; p++) {
          let text = texts[p];
          let partX = parts.filter(item => text.idChr.indexOf(item.idPt) == 0)[0];
          res = res + `<tr><td><span style="text-align: center;"><div><a href="./index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">${partX.title}: <b>${text.title}</b></a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;

        }
        res = res + '</tbody></table></div>'

        res = res + '<div id="tocMAIN">'
        res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody> <tr> <td>'

        // res = res + `<div style="text-align: center;"><a href="./index.html?id=0.01">${chapters[0].title}</a></div>`;
        // res = res + `<div style="text-align: center;"><a href="./index.html?id=0.02">${chapters[1].title}</a></div>`;

        // res = res + '<ul>'
        for (let i = 0; i < parts.length; i++) {
          let part = parts[i];
          res = res + `<div style="text-align: center;" class="dt"><b><a href="./index.html?id=C${part.idPt}" id="a${part.idPt}">${part.title}</a></b></div>`;
          let listTx = []
          listTx = texts.filter(item => item.idChr.indexOf(part.idPt) == 0);
          // console.log(listTx)
          res = res + `<ul class="partOl">`
          for (let j = 0; j < listTx.length; j++) {
            let text = listTx[j];
            res = res + `<li><a href="./index.html?id=T${text.idChr}" id="aT${text.idChr}">${text.title}</a></li>`;

          }
          res = res + '</ul>';
        }
        res = res + `</td></tr></tbody></table>`;
        let TOC = document.getElementById('TOC');
        TOC.innerHTML = res;
        const search = document.getElementById("searchTOC");
        const home = document.getElementById('home');

        function downloadFile(url, fileName) {
          fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
            .then(res => res.blob())
            .then(res => {
              const aElement = document.createElement('a');
              aElement.setAttribute('download', fileName);
              const href = URL.createObjectURL(res);
              aElement.href = href;
              // aElement.setAttribute('href', href);
              aElement.setAttribute('target', '_blank');
              aElement.click();
              URL.revokeObjectURL(href);
            });
        };


        document.getElementById('download').addEventListener('click', function () {
          downloadFile('./Anti-Dühring.epub', 'Anti-Dühring.epub')
        })

        home.addEventListener('click', function () {
          window.location.href = '../index.html'
        })
        let textList = search.getElementsByTagName("tr");
        for (let i = 1; i < textList.length; i++) {
          textList[i].style.display = "none";

        }
        Search2('tr', 'searchTOC', 'textInput2', 1, 'tocMAIN')
      }
    })
});

window.onclick = function (event) {
  if (event.target == modal) {
    // console.log(modal)
    modal.style.display = "none";

  }
}

function changeChapter(index) {
  synth.cancel()
  author.innerHTML = "Friedrich Engels"
  const item = chapters[index];
  // console.log(item)
  part.innerHTML = parts.filter(partX => item.idCh.indexOf(partX.idPt) == 0)[0].title
  // console.log(parts.filter(partX => item.idCh.indexOf(partX.idPt) == 0)[0])
  contents.innerHTML = '';
  btnList = []
  let descriere = '';
  titlu.innerHTML = item.title;
  document.title = item.title;
  info.innerHTML = descriere;
  chTexts = ContentList(item.idCh);
  let contentString = ''
  for (let i = 0; i < chTexts.length; i++) {
    let expBtn = new ExpandedButton(chTexts[i].title, chTexts[i].idChr, i);

    contentString = contentString + expBtn.toString() + '\n';
    btnList.push(expBtn);
  }
  contents.innerHTML = contentString;
  addFunct(btnList);
  anchorChanger();

}

function anchorChanger() {
  let x = 0;
  let notesList = []
  for (x = 1; x <= 320; x++) {
    if (document.getElementById(`n${x}`)) { notesList.push(x); }
  }
  let i = 0;
  if (notesList.length > 0) {
    for (i = 0; i < notesList.length; i++) {

      let x = notesList[i];

      let a = document.getElementById(`n${x}`);
      let note = notes.filter(item => item.idNote == x)[0];
      a.onclick = function () {
        // console.log(note);
        modalBody.innerHTML = note.content
        modal.style.display = "block";
      }
    }

  }
}

function Search2(inputX, searchX, textInputX, startI, tocX) {
  const input = document.getElementById(textInputX);
  input.addEventListener("keyup", function () {
    const search = document.getElementById(searchX);
    let filter = input.value.toUpperCase();
    if (filter != '') {
      let toc = document.getElementById(tocX);
      // console.log(toc)
      toc.style.display = "none";
    }
    else {
      let toc = document.getElementById(tocX);
      toc.style.display = "";
    }
    const textList = search.getElementsByTagName(inputX);
    for (let i = startI; i < textList.length; i++) {
      const aX = textList[i].getElementsByTagName("a")[0]
      let a = aX.getAttribute("id");
      let content = ''
      if (a.includes('CHR')) {
        a = a.substring(3)
        let text = texts.filter(element => element.idChr == a)[0];
        let contentList = text.content.filter(element => !element.includes('<h'));
        content = contentList.join(" ").normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '');
        let notesListX = [...text.content.join(" ").matchAll(/\>\[[\d]+\]\</g)];
        let notesList = []
        notesListX.forEach(function (item) {
          item = item[0];
          item = parseInt(item.substring(2, item.length - 2));
          notesList.push(notes[item - 1])
        })
        notesList.forEach(function (note) {
          content = content + ` ${note.content.join('').normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '')}`;
        })
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

            let text = texts.filter(element => element.idChr == a.substring(3))[0];
            const div = document.getElementById(`chr${text.idChr}`);
            div.innerHTML = res;

          }
          else {

            let text = texts.filter(element => element.idChr == a.substring(3))[0];
            const div = document.getElementById(`chr${text.idChr}`);
            div.innerHTML = '';

          }
        } else {
          textList[i].style.display = "none";
          const aX = textList[i].getElementsByTagName("a")[0]
          let a = aX.getAttribute("id");
          if (a.includes('CHR')) {
            let text = texts.filter(element => element.idChr == a.substring(3))[0];
            const div = document.getElementById(`chr${text.idChr}`);
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
  const form1 = document.getElementById("form1");
  // form2 = document.getElementById("form2");
  let res = ''
  res = res + '<input id="left-menu" type="checkbox"> <input id="left-menu-reset" type="reset"> <nav class="left-navigation"> <main> <label class="menu-toggle" for="left-menu"><span>&nbsp;</span></label> <label class="menu-close" for="left-menu-reset"><span>&nbsp;</span></label> <menu>';
  res = res + '<div id="search">';
  res = res + '<div id="searchTextInput"><input type="text" id="textInput" placeholder="Search"><i class="fa-solid fa-magnifying-glass"></i></div>';

  for (let p = 0; p < texts.length; p++) {
    let text = texts[p];
    let partX = parts.filter(item => text.idChr.indexOf(item.idPt) == 0)[0];
    // console.log(text)
    res = res + `<menuitem> <span><a href="./index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">${partX.title}: <b>${text.title}</b></a><hr style="width:30%;"/><div id="chr${text.idChr}"></div></span> </menuitem>`;

  }
  res = res + '</div>'

  // res = res + '<nav class="left-navigation"> <main>'
  // res = res + '<menu><main><nav>'
  res = res + '<div id="toc">'
  res = res + '<menuitem><menuitem> <span class="heading"><a href="./index.html" id="A0.0"><i class="fa fa-book"></i> Anti-Dühring</a></span> </menuitem>';
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    res = res + `<menuitem> <label for="left-menu-item-${i + 1}"><a href="./index.html?id=P${part.idPt}" id="a${part.idPt}">${part.title}</a></label> <input id="left-menu-item-${i + 1}" type="checkbox"> <nav> <main> <label class="menu-toggle" for="left-menu-item-${i + 1}"><span>&nbsp;</span></label> <menu>`;
    res = res + `<menuitem> <span class="heading"><a href="./index.html?id=C${part.idPt}" id="A${part.idPt}">${part.title}</a></span> </menuitem>`;
    let listTx = []
    listTx = chapters.filter(item => item.idCh.indexOf(part.idPt) == 0);
    // console.log(listCh)
    for (let j = 0; j < listTx.length; j++) {
      let text = listTx[j];
      res = res + `<menuitem> <span><a href="./index.html?id=T${text.idCh}#${text.idCh}" id="aCh${text.idCh}">${text.title}</a></span> </menuitem>`;
    }
    res = res + '</menu></main></nav></menuitem>';
  }
  res = res + `</div></menu></main></nav>`;
  if (window.innerWidth > 350) {
    form1.innerHTML = res;
    const search = document.getElementById("search");

    let textList = search.getElementsByTagName("menuitem");
    for (let i = 0; i < textList.length; i++) {
      textList[i].style.display = "none";
    }
    Search2('menuitem', 'search', 'textInput', 0, 'toc');
  }
}

function openButton(text, btnX, i) {
  // const btn = document.getElementById(`${text.idChr}`);
  const contentsX = document.getElementById(`content${text.idChr}`);
  let resString = "";
  resString = resString + `<div id="synthZone${text.idChr}"></div>`
  // resString = resString + `<center><a href="#notes${text.idChr}">▽</a></center>`
  for (let j = 0; j < text.content.length; j++) {
    if (!text.content[j].includes(['\"marx\"', '\"marxy\"', '\"marxo\"', '\"engelsy\"', '\"engels\"', '\"marxengels\"']))
      resString = resString + '\n' + text.content[j];
  }
  resString = resString + `<center><a href="#${text.idChr}">▲</a></center>`
  resString = resString + `<div style="color: gray;" id=notes${text.idChr}></div>`
  contentsX.innerHTML = resString;
  let x = 0;
  let listA = []
  for (x = 1; x <= 320; x++) {
    if (contentsX.querySelector(`#n${x}`)) { listA.push(x); }
  }
  let iX = 0;
  let res = '';
  if (listA.length > 0) {
    for (iX = 0; iX < listA.length; iX++) {
      let x = listA[iX];
      let note = notes.filter(item => item.idNote == x)[0];
      res = res + note.content
    }
  }
  const noteZone = document.getElementById(`notes${text.idChr}`);
  noteZone.innerHTML = res;
  if (synth.getVoices().filter(item => item.lang.includes('ro')).length > 0) {
    document.getElementById(`synthZone${text.idChr}`).innerHTML = `<button class="expand-btn" id="play${text.idChr}"><i class="fa fa-play"></i></button>&nbsp;<button class="expand-btn" id="stop${text.idChr}"><i class="fa fa-stop"></i></button><div style="display: none"></div>`
    const readText = document.getElementById(`play${text.idChr}`);
    if (navigator.userAgent.indexOf("Win") != -1) {
      readText.addEventListener('click', function () {
        synth.cancel()
        let textToRead = Array.prototype.slice.call(document.getElementById(`content${text.idChr}`).children)
        for (let i = 1; i < text.content.length; i++) {
          if (text.content[i] != '<p>&nbsp;</p>') {
            let utterThis = new SpeechSynthesisUtterance();
            utterThis.voice = synth.getVoices().filter(item => item.lang.includes('ro'))[0]
            document.getElementById(`synthZone${text.idChr}`).lastChild.innerHTML = text.content[i]
            let node = textToRead.filter(item => document.getElementById(`synthZone${text.idChr}`).lastChild.innerHTML.replace(/<[^>]*>/g, '') == item.innerHTML.replace(/<[^>]*>/g, ''))[0]
            // console.log(node)
            utterThis.text = node.innerHTML;
            let saveNode1 = node.innerHTML
            let saveNode = node.innerHTML
            utterThis.onboundary = function (event) {
              if (event.charIndex >= 0) {
                let index = event.charIndex
                let indexSp = saveNode1.indexOf(' ', index)
                if (indexSp == -1) {
                  indexSp = saveNode1.length
                }
                let innerHTML = saveNode.substring(0, event.charIndex) + '<span class="highlight">' + saveNode.substring(event.charIndex, indexSp) + '</span>' + saveNode.substring(indexSp)
                node.innerHTML = innerHTML
                anchorChanger()
              }
            }
            utterThis.onend = function () {
              node.innerHTML = saveNode1
              anchorChanger()
            }
            synth.speak(utterThis)
          }

          // utterThis.onstart = () => console.log()
        }
      })
    }
    else {
      readText.addEventListener('click', function () {
        synth.cancel()
        for (let i = 0; i < text.content.length; i++) {
          let utterThis = new SpeechSynthesisUtterance();
          utterThis.voice = synth.getVoices().filter(item => item.lang.includes('ro'))[0]
          utterThis.text = text.content[i].replace(/<[^>]*>/g, '');
          synth.speak(utterThis)
        }
      })
    }
    const stopText = document.getElementById(`stop${text.idChr}`);
    stopText.addEventListener('click', function () {
      synth.cancel();
    })
  }
  btnX.expanded = true;
  btnList[i] = btnX;
  anchorChanger();

}


function addFunct(btnList) {
  let i = 0;
  for (i = 0; i < chTexts.length; i++) {
    let btnX = btnList[i];
    let text = chTexts[i];
    const btn = document.getElementById(`${text.idChr}`);
    let j = 0;
    const contentsX = document.getElementById(`content${text.idChr}`);
    btn.addEventListener('click', function () {
      if (!btnX.expanded) {
        let resString = "";
        resString = resString + `<div id="synthZone${text.idChr}"></div>`
        for (j = 0; j < text.content.length; j++) {
          if (!text.content[j].includes(['\"marx\"', '\"marxy\"', '\"marxo\"', '\"engelsy\"', '\"engels\"', '\"marxengels\"']))
            resString = resString + '\n' + text.content[j];
        }
        resString = resString + `<center><a href="#${text.idChr}">▲</a></center>`
        resString = resString + `<div style="color: gray;" id=notes${text.idChr}></div>`
        contentsX.innerHTML = resString;
        let x = 0;
        let listA = []
        for (x = 1; x <= 320; x++) {
          if (contentsX.querySelector(`#n${x}`)) { listA.push(x); }

        }
        let i = 0;
        let res = '';
        if (listA.length > 0) {
          for (i = 0; i < listA.length; i++) {
            let x = listA[i];
            let note = notes.filter(item => item.idNote == x)[0];
            res = res + note.content
          }
        }
        const noteZone = document.getElementById(`notes${text.idChr}`);
        noteZone.innerHTML = res;

        // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        //   // console.log(anchor)
        //   anchor.addEventListener('click', function (e) {
        //     e.preventDefault();
        //     document.getElementById([this.getAttribute('href').substring(1)]).scrollIntoView({
        //       behavior: 'smooth'
        //     });
        //   });
        // });
        if (synth.getVoices().filter(item => item.lang.includes('ro')).length > 0) {
          document.getElementById(`synthZone${text.idChr}`).innerHTML = `<button class="expand-btn" id="play${text.idChr}"><i class="fa fa-play"></i></button>&nbsp;<button class="expand-btn" id="stop${text.idChr}"><i class="fa fa-stop"></i></button><div style="display: none"></div>`
          const readText = document.getElementById(`play${text.idChr}`);
          if (navigator.userAgent.indexOf("Win") != -1) {
            readText.addEventListener('click', function () {
              synth.cancel()
              let textToRead = Array.prototype.slice.call(document.getElementById(`content${text.idChr}`).children)
              for (let i = 1; i < text.content.length; i++) {
                if (text.content[i] != '<p>&nbsp;</p>') {
                  let utterThis = new SpeechSynthesisUtterance();
                  utterThis.voice = synth.getVoices().filter(item => item.lang.includes('ro'))[0]
                  document.getElementById(`synthZone${text.idChr}`).lastChild.innerHTML = text.content[i]
                  let node = textToRead.filter(item => document.getElementById(`synthZone${text.idChr}`).lastChild.innerHTML.replace(/<[^>]*>/g, '') == item.innerHTML.replace(/<[^>]*>/g, ''))[0]
                  // console.log(node)
                  utterThis.text = node.innerHTML;
                  let saveNode1 = node.innerHTML
                  let saveNode = node.innerHTML
                  utterThis.onboundary = function (event) {
                    if (event.charIndex >= 0) {
                      let index = event.charIndex
                      let indexSp = saveNode1.indexOf(' ', index)
                      if (indexSp == -1) {
                        indexSp = saveNode1.length
                      }
                      let innerHTML = saveNode.substring(0, event.charIndex) + '<span class="highlight">' + saveNode.substring(event.charIndex, indexSp) + '</span>' + saveNode.substring(indexSp)
                      node.innerHTML = innerHTML
                      anchorChanger()
                    }
                  }
                  utterThis.onend = function () {
                    node.innerHTML = saveNode1
                    anchorChanger()
                  }
                  synth.speak(utterThis)
                }

                // utterThis.onstart = () => console.log()
              }
            })
          }
          else {
            readText.addEventListener('click', function () {
              synth.cancel()
              for (let i = 0; i < text.content.length; i++) {
                let utterThis = new SpeechSynthesisUtterance();
                utterThis.voice = synth.getVoices().filter(item => item.lang.includes('ro'))[0]
                utterThis.text = text.content[i].replace(/<[^>]*>/g, '');
                synth.speak(utterThis)
              }
            })
          }
          const stopText = document.getElementById(`stop${text.idChr}`);
          stopText.addEventListener('click', function () {
            synth.cancel();
          })
        }
        btnX.expanded = true;
        btnList[i] = btnX;
        anchorChanger();
      }
      else {
        synth.cancel()
        btnX.expanded = false;
        btnList[i] = btnX;
        contentsX.innerHTML = '';
        anchorChanger();
      }
    });

  }
}

function ContentList(idCh) {
  let i = 0;
  let res = [];
  for (i = 0; i < texts.length; i++) {
    if (texts[i].idChr.includes(idCh) && texts[i].idChr.indexOf(idCh) == 0) {
      res.push(texts[i])
      // console.log(texts[i]);
    }
  }
  return res;
}

window.onclick = function (event) {
  const modal = document.querySelector(".modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}