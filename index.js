console.log("welcome to the brain of web dev")
showNotes();

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById("addtxt");
    let notes = localStorage.getItem("notes");

    //if local storage is null, create an array noteObj
    if (notes == null) {
        notesObj = [];
    }
    //if localStorage is not Null, parse the new text with notesObj
    else {

        notesObj = JSON.parse(notes);
    }

    notesObj.push(addtxt.value);

    //adding notes:notesObj in local Storage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    // console.log(notesObj);
    showNotes();
    // deleteNode();
})


function showNotes() {
    let notes = localStorage.getItem("notes");
    //if local storage is null, create an array noteObj
    if (notes == null) {
        notesObj = [];
    }
    //if localStorage is not Null, parse the new text with notesObj
    else {

        notesObj = JSON.parse(notes);
    }

    //Adding a note with all the previous note
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNode(this.id)" class="btn" id="addbtn" style="background-color: #0e41eb; border-color: black;">Delete Notes</button>
            </div>
        </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    console.log("number of notes:" + notesObj.length);
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a note".`
    }
}

// function to delete a note
function deleteNode(index) {
    console.log("deleting note with index:" + index + 1);

    let notes = localStorage.getItem("notes");
    //if local storage is null, create an array noteObj
    if (notes == null) {
        notesObj = [];
    }
    //if localStorage is not Null, parse the new text with notesObj
    else {

        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// implementing Search button
let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
    let inputValue = search.value.toLowerCase();
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})