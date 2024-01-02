import "./App.css";
import Navbar from "./components/Navbar";
import Panel from "./components/Panel";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          id: crypto.randomUUID(),
          title: note.title,
          text: note.text,
        },
      ];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note.id !== id;
      });
    });
  };

  const editNote = (editedNote) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (editedNote.id === note.id) {
          return { ...editedNote };
        }
        return note;
      });
    });
  };

  return (
    <div className="App">
      <Navbar />
      <Panel>
        <AddNote setNote={addNote} />
        <NotesList notes={notes} removeNote={deleteNote} editNote={editNote} />
      </Panel>
    </div>
  );
}

export default App;
