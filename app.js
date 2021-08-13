showNotes()
//  If user adds a note add it to localstorage
let addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt')
    let noteTitle = document.getElementById('Title')
    let notes = localStorage.getItem('notes')
    let today = new Date()
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myobj = {
        title: noteTitle.value,
        text: addTxt.value,
        date: today.getDate(),
        Month: month[today.getMonth()],

    }
    notesObj.push(myobj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = ''
    noteTitle.value = ''
    console.log(notesObj[notesObj.length - 1]);
    showNotes();
})


// Function to show notes from Localstorage
function showNotes() {
    let notes = localStorage.getItem('notes')

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }

    let html = ''
    notesObj.forEach(function (element, index) {
        html += `<div class="card my-3 mx-3" style="width: 40%; border: 3px solid blue">
        <div class="card-body">
            <h5 class="card-title" style="font-size:100%">${element.title}</h5>
            <p class="card-text">(${element.date} ${element.Month})</p> 
            <p class="card-text">${element.text}</p> 
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
        </div>
    </div>`

    });

    let notesContainer = document.getElementById('notes')

    if (notesObj.length != 0) {
        notesContainer.innerHTML = html;
    }
    else {
        notesContainer.innerHTML = `Nothing To Display! Create Your Notes`
        notesContainer.style.padding = '5px'

    }

}

// Function to delete a note
//  index argument : index of the array(noteObj) to delete note

function deleteNote(index) {
    console.log('I am deleting', Number(index) + 1);
    let notes = localStorage.getItem('notes')

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}

let searchAll = document.getElementsByClassName('searchTxt')
Array.from(searchAll).forEach(Object => {
    Object.addEventListener('input', function () {
        let inputValNotes = Object.value
        let noteCardsSeacrh = document.getElementsByClassName('card')
        Array.from(noteCardsSeacrh).forEach(element => {
            let cardTxtNotes = element.querySelector('.card-text')
            let TitleTXTNotes = element.querySelector('h5')
            if (cardTxtNotes.innerText.includes(inputValNotes) || TitleTXTNotes.innerText.includes(inputValNotes)) {
                element.style.display = 'block'
            }
            else {
                element.style.display = 'none'

            }
        })
    });
})