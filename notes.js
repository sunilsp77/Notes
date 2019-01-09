// console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try{
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  }catch(error){
    return [];
  }

};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) =>{
  console.log('Adding note', title, body);
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () =>{
  return fetchNotes();
};

var getNote = (title) =>{
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

var remove = (title) =>{
  var notes = fetchNotes();
  var remainingNotes = notes.filter((note) => note.title !== title);
  saveNotes(remainingNotes);

  return notes.length !== remainingNotes.length;
};

var logNote = (note) =>{
  debugger;
  console.log('----------------------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};
module.exports = {
  addNote,
  getAll,
  getNote,
  remove,
  logNote
};
