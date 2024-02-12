import React, { useEffect, useState } from 'react'
//import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = (props) => {
  let [notes, setNotes] = useState([]) 
  console.log("notes", notes);

  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    let response = await fetch('http://localhost:5002/notes')
    let data = await response.json()
    console.log("data:", data)
    setNotes(data)
  }

  useEffect(() => {
    getNotes();
  }, []);

  console.log(notes)
  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>

      <div className='notes-list'>
        {notes.map((note, index) => (
          <ListItem key={index} note={note}/>
        ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage