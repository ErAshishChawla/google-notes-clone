import { BsFillTrashFill, BsCheckLg } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useState, useRef } from "react";
import "./Note.css";

function Note({ note, removeNote, editNote }) {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    title: note.title,
    text: note.text,
  });
  const ref = useRef(null);

  const handleEditClick = () => {
    if (!isEditable) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
      editNote({ id: note.id, title: formData.title, text: formData.text });
      const textArea = ref.current;
      textArea.style.height = "auto";
    }
  };

  const handleRemoveClick = () => {
    removeNote(note.id);
  };

  const handleChange = (e) => {
    if (ref.current) {
      const textArea = ref.current;
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }

    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  return (
    <form
      className={!isEditable ? "Note" : "Note enabled"}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="Title"
        className="title"
        name="title"
        value={formData.title}
        disabled={!isEditable}
        onChange={handleChange}
      />
      <textarea
        type="text"
        placeholder="Take a Note..."
        className="text"
        name="text"
        value={formData.text}
        disabled={!isEditable}
        onChange={handleChange}
        ref={ref}
      />
      <div className="options">
        <button className="edit" onClick={handleEditClick}>
          {!isEditable ? <MdModeEdit /> : <BsCheckLg />}
        </button>
        <button className="delete" type="button" onClick={handleRemoveClick}>
          <BsFillTrashFill />
        </button>
      </div>
    </form>
  );
}

export default Note;
