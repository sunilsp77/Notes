// console.log('starting app.js');

//using File System module of nodejs.org/api
const fs = require('fs');
//loading lodash module of npm
const _ = require('lodash');
//loading yargs module parsing of command line arguements
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of node',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of node',
  demand: true,
  alias: 'b'
};
const argv = yargs
             .command('add','Add a new note',{
               title: titleOptions,
               body: bodyOptions
             })
             .command('list','List all notes')
             .command('read','Read a note',{
               title: titleOptions
             })
             .command('remove','Remove a note',{
               title: titleOptions
             })
             .argv;
// var command = process.argv[2];
var command = argv._[0];

// console.log('Command : ',command);
// console.log('Process ',process.argv);
// console.log('Yargs ',argv);

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log('Note created');
    notes.logNote(note);
  }else {
    console.log('Note title taken');
  }
}else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));
}else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if(note){
    console.log('Note found');
    notes.logNote(note);
  }else{
    console.log('Note not found')
  }
}else if (command === 'remove') {
  var noteRemoved = notes.remove(argv.title);
  var message = noteRemoved ? "Note was removed" : "Note not found";
  console.log(message);
}else{
  console.log('command not recognised');
}
