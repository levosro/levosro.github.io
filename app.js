import { books } from "./books.mjs";


window.addEventListener("DOMContentLoaded", function () {
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


    for (let i = 0; i < books.length; i++) {
        const bookCover = document.getElementById(`cover${i}`)
        bookCover.addEventListener('click', function () {
            // window.location.href = books[i].link;
            window.open(books[i].link, '_blank').focus();
        })
    }
})

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