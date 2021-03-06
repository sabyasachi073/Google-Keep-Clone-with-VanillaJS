const addButton = document.querySelector("#add");

let emptyNote;
let previousEmptyNote;

const upadteLSData = () => {
  const textAreaData = document.querySelectorAll("textarea"); // Since we will store data of all the notes so we are using "querySelectorAll"
  const notes = [];

  textAreaData.forEach((note) => {
    return notes.push(note.value); // It pushes the element at the end
    // return notes.unshift(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

// Beginning of addNewNote

// function emptyNoteOperation() {
//     document.querySelectorAll("textarea").lastElementChild.focus();
// }

function addNewNote(text = "") {
  let editing;

  // Condition to stop user from generating duplicate empty note
  if (previousEmptyNote && !text) {
    alert("You have alredy created an empty note...let's put some thoughts into it 👉");

    setTimeout(() => {
      const data = document.querySelectorAll("textarea");
      data[data.length - 1].focus();
      window.scrollTo(0, document.body.clientHeight);
    }, 0);

    return;
  }

  const note = document.createElement("div"); // This is to add a HTML element to our main HTML page

  note.classList.add("note"); // To add a class to the div created from JS
  //   fas fa-check
  //   <i class="fas edit__icon fa-check"></i>

  const htmlData = `
    <div class="operation">
        <button class="edit">
            <i class="fas edit__icon ${text ? "fa-edit" : "fa-check"}"></i>
        </button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"> </div>
    <textarea class="${text ? "hidden" : ""}"></textarea> `; // HTML Data we want add to our HTML page on clicking the "Add Note" Button

  note.insertAdjacentHTML("afterbegin", htmlData); // To add data inside the note element

  // 'beforebegin': Before the targetElement itself.
  // 'afterbegin': Just inside the targetElement, before its first child.
  // 'beforeend': Just inside the targetElement, after its last child.
  // 'afterend': After the targetElement itself.

  // Example ->
  // ----------
  // beforebegin
  // <p>
  // afterbegin
  // foo
  // beforeend
  // </p>
  // afterend

  // Getting the references
  const editButton = note.querySelector(".edit"); // To get the reference of the "edit" button which we have created inside the "note" div in the JS file.
  // Here, we can't write here "document.querySelector('.edit)" because it is not inside the our main document i.e our webpage rather we will render note dynamically within which the "edit" button is present. So we need to use "note.querySelector('.edit')".

  editing = text ? false : true; // If there was already text available in note then it would be true else false

  const editIcon = note.querySelector(".edit__icon");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // To focus on the TEXTAREA field when new note is added. We need to use "setTimeout()" method to focus on text area initially
  if (!textArea.value) {
    setTimeout(() => {
      textArea.focus();
    }, 0);
  }

  // Deleting the node
  delButton.addEventListener("click", () => {
    note.remove(); // This to delete the complete note within which the delete button is present

    upadteLSData();

    if (emptyNote) {
      emptyNote = !emptyNote;
    }
  });

  // Toggle using edit button
  textArea.value = text;
  mainDiv.innerHTML = text;
  // The text of the both "textArea" and "mainDiv" will be same if previously any data is present

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden"); // Here this line means within HTML element(div) with class name ".main", if the class ".hidden" is absent then it would add the class ".hidden" else if the class ".hidden" present in the div(with class name ".main") then it would remove the class.
    // Function of '.toggle' is to add the something if its absent and remove if its present

    textArea.classList.toggle("hidden");

    // Changing the Edit icon on clicking the button
    editing = !editing;

    if (editing) {
      editIcon.classList.remove("fa-edit");
      editIcon.classList.add("fa-check");
      textArea.focus();
    } else {
      editIcon.classList.remove("fa-check");
      editIcon.classList.add("fa-edit");
    }
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value; // Adding the value enter in the textarea to the ".mainDiv"

    upadteLSData();

    emptyNote = textArea.value ? false : true;
  });

  // In the .addEventListener(event, function) => the event 'change' is fired when ever there is change in the textarea(It changes after we write the complete text and then click outside). While the event 'input' is fired whenever we enter any character(i.e alphabet, letter, etc.).

  document.body.appendChild(note); // The "appendChild()" method appends a node as the last child of a node
  // Here the previous line means we want to append/add the "note" div to the body of the html as the last child(i.e. it will render at the end of the webpage).
  

  setTimeout(()=> {
      window.scrollTo(0, document.body.clientHeight); // Scrolling to bottom of page when new note is entered
  }, 0);
  // Outside "setTimeout()" sometimes the scroll doesn't work properly but inside "setTimeout()" it works properly.

}
// End of addNewNote

// Getting data back from localStorgae
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => {
  previousEmptyNote = emptyNote;
  emptyNote = true;
  return addNewNote();
}); // The addNewNote function will be called when ever the event "click" is executed i.e whenever the button(#add) is clicked

// The localStorage and session Storage properties allow to save key/value pairs in a web browser. The localStorage object stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available later on.
