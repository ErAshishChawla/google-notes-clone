import "./AddNote.css";
import { useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";

function AddNote({ setNote }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const ref = useRef(null);
  const expandedInputRef = useRef(null);

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    const handleWindowClick = (e) => {
      if (e.button === 2) {
        return;
      }
      if (
        expandedInputRef.current &&
        !expandedInputRef.current.contains(e.target)
      ) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("mousedown", handleWindowClick);

    return () => {
      window.removeEventListener("mousedown", handleWindowClick);
    };
  }, []);

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

  const displayInput = (
    <div className="display-input">
      <input
        type="text"
        placeholder="Take a Note..."
        onClick={handleExpandClick}
        onChange={() => {}}
        value={""}
      />
    </div>
  );

  const expandedInput = (
    <div className="expanded-input">
      <input
        type="text"
        placeholder="Title"
        className="title"
        onChange={handleChange}
        name="title"
        value={formData.title}
      />
      <textarea
        type="text"
        placeholder="Take a Note..."
        className="note"
        ref={ref}
        onChange={handleChange}
        name="text"
        value={formData.text}
      />
    </div>
  );

  const handleAddNote = (e) => {
    if (formData.title === "" && formData.text === "") {
      return;
    }
    setIsExpanded(false);
    setNote(formData);
    setFormData({ title: "", text: "" });
  };

  return (
    <form
      className="AddNote"
      ref={expandedInputRef}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {!isExpanded ? displayInput : expandedInput}
      {isExpanded && (
        <button className="add-button" type="button" onClick={handleAddNote}>
          <BsPlus />
        </button>
      )}
    </form>
  );
}

export default AddNote;
