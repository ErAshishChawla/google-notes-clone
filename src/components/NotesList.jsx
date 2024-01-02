import "./NotesList.css";
import Note from "./Note";

function NotesList({ notes, removeNote, editNote }) {
  const renderedNotes = notes.map((note) => {
    return (
      <Note
        note={note}
        key={note.id}
        removeNote={removeNote}
        editNote={editNote}
      />
    );
  });
  return <div className="NotesList">{renderedNotes}</div>;
}

export default NotesList;
