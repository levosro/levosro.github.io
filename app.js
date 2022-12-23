import books from "./books.mjs";

import meTexts from "./antologia-me/msj/texts.mjs";
import meCitate from "./antologia-me/citate/citate.mjs"
import meNotes from "./antologia-me/msj/notes.mjs"

import lTexts from "./antologia-lenin/msj/texts.mjs"
import lCitate from "./antologia-lenin/citate/citate.mjs"
import lNotes from "./antologia-lenin/msj/notes.mjs"

import antiDTexts from "./antiduhring/msj/texts.mjs"
import antiDNotes from "./antiduhring/msj/notes.mjs"

import luxemburgTexts from "./luxemburg/msj/texts.mjs"
import luxemburgNotes from "./luxemburg/msj/notes.mjs"

import debordTexts from "./debord/msj/texts.mjs"

let btnList = []

let marxTexts = meTexts.filter(item => item.image.includes('marx') && !item.image.includes('engels'))
let engelsTexts = meTexts.filter(item => item.image.includes('engels') && !item.image.includes('marx'))
let maEnTexts = meTexts.filter(item => item.image.includes('engels') && item.image.includes('marx'))


class ExpandedButton {
  constructor(title) {
    this.title = title;
    this.expanded = false;
  }
  toString() {
    return `<section class="container"> <button class="expand-btn" id="${this.title}">${this.title}</button> </section>\n<div id="content${this.title}"></div>`;

  }
}

window.addEventListener("DOMContentLoaded", function () {
  let ok = false
  let res = ''
  let antologii = books.filter(item => item.title.includes('Antologia'))
  for (let i = 0; i < antologii.length; i++) {
    let book = antologii[i]
    let index = books.indexOf(book)
    // console.log(book)
    res = res + `<div class="book"> <img class="cover" id="cover${index}" src="${book.cover}"/> <div class="text"> <center> <h1 class="title"><a href="${book.link}" target="_blank">${book.title}</a></h1> <h1 class="author">${book.author}</h1> </center> </div> </div>`
  }
  const antologiiC = document.querySelector('.antologii');
  antologiiC.innerHTML = res;


  res = ''
  let bookContent = books.filter(item => !item.title.includes('Antologia'))
  for (let i = 0; i < bookContent.length; i++) {
    let book = bookContent[i]
    let index = books.indexOf(book)
    // console.log(book)
    res = res + `<div class="book"> <img class="cover" id="cover${index}" src="${book.cover}"/> <div class="text"> <center> <h1 class="title"><a href="${book.link}" target="_blank">${book.title}</a></h1> <h1 class="author">${book.author}</h1> </center> </div> </div>`
  }
  const content = document.querySelector('.content');
  content.innerHTML = res;


  res = ''
  res = res + '<div id="searchSITE">';
  res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody> <tr> <td><div id="searchTextInput"><input type="text" id="textInput2" placeholder="Search"></div></td></tr></tbody></table>'
  res = res + '</div>'

  let search = document.getElementById('search');
  search.innerHTML = res;

  document.getElementById('textInput2').addEventListener("keyup", function () {

    res = ''
    res = res + '<center>'
    res = res + new ExpandedButton('Karl Marx');
    btnList.push(new ExpandedButton('Karl Marx'))
    res = res + new ExpandedButton('Friedrich Engels');
    btnList.push(new ExpandedButton('Friedrich Engels'))
    res = res + new ExpandedButton('Marx & Engels');
    btnList.push(new ExpandedButton('Marx & Engels'))
    res = res + new ExpandedButton('V. I. Lenin');
    btnList.push(new ExpandedButton('V. I. Lenin'))
    res = res + new ExpandedButton('Rosa Luxemburg');
    btnList.push(new ExpandedButton('Rosa Luxemburg'))
    res = res + new ExpandedButton('Guy Debord');
    btnList.push(new ExpandedButton('Guy Debord'))
    res = res + '<div>&nbsp;</div></center>'



    let search = document.getElementById('searchSITE');


    let div = document.createElement('div');
    div.innerHTML = res.trim();
    if (!ok) {
      search.appendChild(div.firstChild);
      ok = !ok
      document.getElementById('books').style.display = 'none';

      document.getElementById("Karl Marx").addEventListener('click', function () {
        let button = btnList.filter(item => item.title == "Karl Marx")[0];
        let index = btnList.indexOf(button)
        button.expanded = !button.expanded
        if (button.expanded) { document.getElementById("Karl Marx").innerHTML = 'Karl Marx ▲' }
        else {
          document.getElementById("Karl Marx").innerHTML = 'Karl Marx ▼'
        }
        // btnList[index] = button;
        let content = document.getElementById('contentKarl Marx')
        if (button.expanded) {

          res = ''
          res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody>';

          for (let p = 0; p < marxTexts.length; p++) {
            let text = marxTexts[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-me/index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">${text.info}</a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;
          }

          for (let p = 0; p < meCitate.filter(item => item.img.includes('marx') && !item.img.includes('engels')).length; p++) {
            let citat = meCitate.filter(item => item.img.includes('marx') && !item.img.includes('engels'))[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-me/citate.html?cit=${citat.id}" id="CIT${citat.id}">${citat.autor}, ${citat.titlu.replace(/(<[a|A][^>]*>|)/g, '')}</a></div><div id="cit${citat.id}"></div><hr style="width:30%;"/></span> </tr></td>`;
          }

          res = res + '</tbody></table></div>'
          content.innerHTML = res;
          if (document.getElementById('textInput2').value.toUpperCase() == '') {
            let textList = [].slice.call(search.getElementsByTagName('tr'));
            textList.shift();
            textList.forEach(element => {
              element.style.display = "none";
            });
          }
          else {
            Search2('tr', 'contentKarl Marx', 'textInput2', 0, 'books', marxTexts, meCitate.filter(item => item.img.includes('marx') && !item.img.includes('engels')), meNotes)
          }

        }
        else {
          content.innerHTML = ''
        }
      }
      )

      document.getElementById("Friedrich Engels").addEventListener('click', function () {
        let button = btnList.filter(item => item.title == "Friedrich Engels")[0];
        let index = btnList.indexOf(button)
        button.expanded = !button.expanded
        if (button.expanded) { document.getElementById("Friedrich Engels").innerHTML = 'Friedrich Engels ▲' }
        else {
          document.getElementById("Friedrich Engels").innerHTML = 'Friedrich Engels ▼'
        }
        // btnList[index] = button;
        let content = document.getElementById('contentFriedrich Engels')
        if (button.expanded) {

          res = ''
          res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody>';

          for (let p = 0; p < engelsTexts.length; p++) {
            let text = engelsTexts[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-me/index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">${text.info}</a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;
          }

          for (let p = 0; p < meCitate.filter(item => item.img.includes('engels') && !item.img.includes('marx')).length; p++) {
            let citat = meCitate.filter(item => item.img.includes('engels') && !item.img.includes('marx'))[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-me/citate.html?cit=${citat.id}" id="CIT${citat.id}">${citat.autor}, ${citat.titlu.replace(/(<[a|A][^>]*>|)/g, '')}</a></div><div id="cit${citat.id}"></div><hr style="width:30%;"/></span> </tr></td>`;
          }

          for (let p = 0; p < antiDTexts.length; p++) {
            let text = antiDTexts[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antiduhring/index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">Friedrich Engels, „Anti-Dühring“: ${text.title}</a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;
          }

          res = res + '</tbody></table></div>'
          content.innerHTML = res;
          if (document.getElementById('textInput2').value.toUpperCase() == '') {
            let textList = [].slice.call(search.getElementsByTagName('tr'));
            textList.shift();
            textList.forEach(element => {
              element.style.display = "none";
            });
          }
          else {
            Search2('tr', 'contentFriedrich Engels', 'textInput2', 0, 'books', [...engelsTexts, ...antiDTexts], meCitate.filter(item => item.img.includes('engels') && !item.img.includes('marx')), [...meNotes, ...antiDNotes])
          }
        }
        else {
          content.innerHTML = ''
        }
      }
      )

      document.getElementById("Marx & Engels").addEventListener('click', function () {
        let button = btnList.filter(item => item.title == "Marx & Engels")[0];
        let index = btnList.indexOf(button)
        button.expanded = !button.expanded
        if (button.expanded) { document.getElementById("Marx & Engels").innerHTML = 'Marx & Engels ▲' }
        else {
          document.getElementById("Marx & Engels").innerHTML = 'Marx & Engels ▼'
        }
        // btnList[index] = button;
        let content = document.getElementById('contentMarx & Engels')
        if (button.expanded) {

          res = ''
          res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody>';

          for (let p = 0; p < maEnTexts.length; p++) {
            let text = maEnTexts[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-me/index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">${text.info}</a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;
          }

          for (let p = 0; p < meCitate.filter(item => item.img.includes('marx') && item.img.includes('engels')).length; p++) {
            let citat = meCitate.filter(item => item.img.includes('marx') && item.img.includes('engels'))[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-me/citate.html?cit=${citat.id}" id="CIT${citat.id}">${citat.autor}, ${citat.titlu.replace(/(<[a|A][^>]*>|)/g, '')}</a></div><div id="cit${citat.id}"></div><hr style="width:30%;"/></span> </tr></td>`;
          }

          res = res + '</tbody></table></div>'
          content.innerHTML = res;
          if (document.getElementById('textInput2').value.toUpperCase() == '') {
            let textList = [].slice.call(search.getElementsByTagName('tr'));
            textList.shift();
            textList.forEach(element => {
              element.style.display = "none";
            });
          }
          else {
            Search2('tr', 'contentMarx & Engels', 'textInput2', 0, 'books', maEnTexts, meCitate.filter(item => item.img.includes('marx') && item.img.includes('engels')), meNotes)
          }

        }
        else {
          content.innerHTML = ''
        }
      }
      )

      document.getElementById("V. I. Lenin").addEventListener('click', function () {
        let button = btnList.filter(item => item.title == "V. I. Lenin")[0];
        button.expanded = !button.expanded
        if (button.expanded) { document.getElementById("V. I. Lenin").innerHTML = 'V. I. Lenin ▲' }
        else {
          document.getElementById("V. I. Lenin").innerHTML = 'V. I. Lenin ▼'
        }
        // btnList[index] = button;
        let content = document.getElementById('contentV. I. Lenin')
        if (button.expanded) {

          res = ''
          res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody>';

          for (let p = 0; p < lTexts.length; p++) {
            let text = lTexts[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-lenin/index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">Lenin: ${text.info}</a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;
          }

          for (let p = 0; p < lCitate.length; p++) {
            let citat = lCitate[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./antologia-lenin/citate.html?cit=${citat.id}" id="CIT${citat.id}">${citat.autor}, ${citat.titlu.replace(/(<[a|A][^>]*>|)/g, '')}</a></div><div id="cit${citat.id}"></div><hr style="width:30%;"/></span> </tr></td>`;
          }

          res = res + '</tbody></table></div>'
          content.innerHTML = res;
          if (document.getElementById('textInput2').value.toUpperCase() == '') {
            let textList = [].slice.call(search.getElementsByTagName('tr'));
            textList.shift();
            textList.forEach(element => {
              element.style.display = "none";
            });
          }
          else {
            Search2('tr', 'contentV. I. Lenin', 'textInput2', 0, 'books', lTexts, lCitate, lNotes)
          }
        }
        else {
          content.innerHTML = ''
        }
      }
      )

      document.getElementById("Rosa Luxemburg").addEventListener('click', function () {
        let button = btnList.filter(item => item.title == "Rosa Luxemburg")[0];
        button.expanded = !button.expanded
        if (button.expanded) { document.getElementById("Rosa Luxemburg").innerHTML = 'Rosa Luxemburg ▲' }
        else {
          document.getElementById("Rosa Luxemburg").innerHTML = 'Rosa Luxemburg ▼'
        }
        // btnList[index] = button;
        let content = document.getElementById('contentRosa Luxemburg')
        if (button.expanded) {

          res = ''
          res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody>';

          for (let p = 0; p < luxemburgTexts.length; p++) {
            let text = luxemburgTexts[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./luxemburg/index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">Rosa Luxemburg: „${text.title}“</a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;
          }

          res = res + '</tbody></table></div>'
          content.innerHTML = res;
          if (document.getElementById('textInput2').value.toUpperCase() == '') {
            let textList = [].slice.call(search.getElementsByTagName('tr'));
            textList.shift();
            textList.forEach(element => {
              element.style.display = "none";
            });
          }
          else {
            Search2('tr', 'contentRosa Luxemburg', 'textInput2', 0, 'books', luxemburgTexts, [], luxemburgNotes)
          }
        }
        else {
          content.innerHTML = ''
        }
      }
      )

      document.getElementById("Guy Debord").addEventListener('click', function () {
        let button = btnList.filter(item => item.title == "Guy Debord")[0];
        button.expanded = !button.expanded
        if (button.expanded) { document.getElementById("Guy Debord").innerHTML = 'Guy Debord ▲' }
        else {
          document.getElementById("Guy Debord").innerHTML = 'Guy Debord ▼'
        }
        // btnList[index] = button;
        let content = document.getElementById('contentGuy Debord')
        if (button.expanded) {

          res = ''
          res = res + '<table style="width: 50%; margin-left: auto; margin-right: auto;"> <tbody>';

          for (let p = 0; p < debordTexts.length; p++) {
            let text = debordTexts[p];
            res = res + `<tr><td><span style="text-align: center;"><div><a href="./debord/index.html?id=T${text.idChr}#${text.idChr}" id="CHR${text.idChr}">Guy Debord, „Societatea spectacolului“: ${text.title}</a></div><div id="chr${text.idChr}"></div><hr style="width:30%;"/></span></tr></td>`;
          }

          res = res + '</tbody></table></div>'
          content.innerHTML = res;
          if (document.getElementById('textInput2').value.toUpperCase() == '') {
            let textList = [].slice.call(search.getElementsByTagName('tr'));
            textList.shift();
            textList.forEach(element => {
              element.style.display = "none";
            });
          }
          else {
            Search2('tr', 'contentGuy Debord', 'textInput2', 0, 'books', debordTexts, [], [])
          }
        }
        else {
          content.innerHTML = ''
        }
      }
      )
    }

    if (ok && document.getElementById('textInput2').value == '') {
      search.removeChild(search.lastChild)
      ok = !ok;
      document.getElementById('books').style.display = '';
      for (let i = 0; i < books.length; i++) {
        const bookCover = document.getElementById(`cover${i}`)
        bookCover.addEventListener('click', function () {
          // window.location.href = books[i].link;
          window.open(books[i].link, '_blank').focus();
        })
      }
    }
  })


})

function Search2(inputX, searchX, textInputX, startI, tocX, texts, citate, notes) {
  const input = document.getElementById(textInputX);
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
      let contentList = [text.title, ...text.content.filter(element => !element.includes('<h'))];
      content = contentList.join(" ").normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '');
      let notesListX = [...text.content.join(" ").matchAll(/\>\[[\d]+\]\</g)];
      let notesList = []
      notesListX.forEach(function (item) {
        item = item[0];
        item = parseInt(item.substring(2, item.length - 2));
        notesList.push(notes.filter(itemN => itemN.idNote == item)[0])
      })
      notesList.forEach(note =>
        content = content + ` ${note.content.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '')}`
      )
    }
    else {
      let x = parseInt(a.substring(3))
      let citat = citate.filter(item => item.id == x)[0]
      content = content + citat.titlu.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '') + ' ' + citat.text.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '')

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
          } else {
            let citat = citate.filter(element => element.id == parseInt(a.substring(3)))[0];
            const div = document.getElementById(`cit${citat.id}`);
            div.innerHTML = res;
          }
        }
        else {
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
        let contentList = [text.title, ...text.content.filter(element => !element.includes('<h'))];
        content = contentList.join(" ").normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '');
        let notesListX = [...text.content.join(" ").matchAll(/\>\[[\d]+\]\</g)];
        let notesList = []
        notesListX.forEach(function (item) {
          item = item[0];
          item = parseInt(item.substring(2, item.length - 2));
          notesList.push(notes.filter(itemN => itemN.idNote == item)[0])
        })
        notesList.forEach(note =>
          content = content + ` ${note.content.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '')}`
        )
      }
      else {
        let x = parseInt(a.substring(3))
        let citat = citate.filter(item => item.id == x)[0]
        content = content + citat.titlu.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '') + ' ' + citat.text.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/<[^>]*>/g, '')

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
            } else {
              let citat = citate.filter(element => element.id == parseInt(a.substring(3)))[0];
              const div = document.getElementById(`cit${citat.id}`);
              div.innerHTML = res;
            }
          }
          else {
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


document.getElementById('youtube').addEventListener('click', function () {
  window.open('https://www.youtube.com/@levos4355', '_blank').focus();
})
document.getElementById('instagram').addEventListener('click', function () {
  window.open('https://www.instagram.com/levosro/', '_blank').focus();
})
document.getElementById('facebook').addEventListener('click', function () {
  window.open('https://www.facebook.com/rolevos', '_blank').focus();
})
document.getElementById('discord').addEventListener('click', function () {
  window.open('https://discord.gg/dQY44b7T', '_blank').focus();
})