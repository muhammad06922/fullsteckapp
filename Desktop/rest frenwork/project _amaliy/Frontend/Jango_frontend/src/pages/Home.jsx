import { useEffect, useState } from "react";
import api from "../api";
import Notes from "./Notes";
import "../style/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");


  const getNote = () => {
    api
      .get("/api/notes")
      .then((res) => {
        console.log(res);
        return res.data
      })
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };


  useEffect(() => { getNote }, []);


  const detletNote = (id) => {
    api.delete(`/api/notes/delete/${id}`).then(
      (res) => {
        if (res.status === 204)
          alert("Note Delete")
        else alert("Failed to delete note.")
        getNote();
      }
    ).catch((error) => alert(error))
    
  }

  const create = (e) => {
    e.preventDefault();
    api.post("/api/notes/", { content, title, author: 1})
      .then((res) => {
        if (res.status === 201) alert("Note Created")
        else alert("Failed to make not")
        getNote();
      })
      .catch((error) => alert(error))
  }







  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note)=>(<Notes note={note} onDelete={detletNote} key={note.id}/>))}
      </div>
      <h2>Notes Tuizsh  </h2>
      <form action="" onSubmit={create}>
        <label htmlFor="title">Title: </label>
        <br />
        <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)}
          value={title} />
        <label htmlFor="content">Content :</label>
        <br />
        <textarea name="content" id="content"
          required onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
