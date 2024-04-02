import React, { FunctionComponent, useCallback, useState } from "react";

import "./notes.css";
import { Note, PendingNote } from "../../model";
import NoteComponent from "../note";
import InputModal from "../input-mopal";
import { useSelector } from "react-redux";
import { useNotesSelector } from "../../hooks";

export interface Props {
  onCreateNote: (note: PendingNote) => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (id: string, newContent: string) => void;
  onMoveNote: (noteID: string, origin: number, destination: number) => void;
  notes: Note[];
}

export const Notes: FunctionComponent<Props> = ({
  notes,
  onDeleteNote,
  onCreateNote,
  onMoveNote,
  onEditNote
}) => {
  const userID = useNotesSelector(state => state.userID);
  const [inputting, setInputting] = useState<"NEW_NOTE" | "NOTE_EDIT" | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [originIDX, setOriginIDX] = useState(-1);
  const [destinationIDX, setDestinationIDX] = useState(-1);
  const [dragging, setDragging] = useState(false);

  return (
    <>
      <div className="notes">
        {notes.length > 0 ? notes.map((note, idx) => (
            <NoteComponent
              key={note.id}
              note={note}
              onDelete={() => onDeleteNote(note.id)}
              dragging={originIDX === idx}
              onMove={(destination: number) => onMoveNote(note.id, idx, destination)}
              position={idx}
              onEdit={() => {
                setInputting("NOTE_EDIT");
                setEditingNote(note);
              }}
            />
          
        )) : <h3 className="no-notes">No notes. Write one!</h3>}
        
        {!!inputting && (
          <InputModal
            prompt={inputting === "NEW_NOTE" ? "Create new note" : "Edit note"}
            onSubmit={(input) => {
              setInputting(null);
              switch (inputting) {
                case "NEW_NOTE":
                  onCreateNote({
                    authorID: userID!,
                    body: input,
                  });
                  break;
                case "NOTE_EDIT":
                  onEditNote(editingNote!.id, input)
              }
              setInputting(null);
              setEditingNote(null);
              
            }}
            value={inputting === "NOTE_EDIT" ? editingNote!.body : ""}
            onCancel={() => setInputting(null)}
          />
        )}
      </div>
      <div className="bottom">
        <button
          className="new-note"
          onClick={() => setInputting("NEW_NOTE")}
        >
          +
        </button>
      </div>
    </>
    
  );
};
