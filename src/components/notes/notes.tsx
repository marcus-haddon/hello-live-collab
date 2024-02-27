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
  onEditNote: (newContent: string) => void;
  onMoveNote: (noteID: string, origin: number, destination: number) => void;
  notes: Note[];
}

export const Notes: FunctionComponent<Props> = ({
  notes,
  onDeleteNote,
  onCreateNote,
  onMoveNote
}) => {
  const userID = useNotesSelector(state => state.userID);
  const [showModal, setShowModal] = useState(false);

  const [originIDX, setOriginIDX] = useState(-1);
  const [destinationIDX, setDestinationIDX] = useState(-1);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="notes">
      {notes.map((note, idx) => (
        <>
          <NoteComponent
            key={note.id}
            note={note}
            onDelete={() => onDeleteNote(note.id)}
            dragging={originIDX === idx}
            onMove={(destination: number) => onMoveNote(note.id, idx, destination)}
            position={idx}
          />
          
          {/* {destinationIDX === idx && <div className="destination" key={`divider-${idx}`}>to here</div>} */}
        </>
        
      ))}
      <div className="bottom">
        <button
          className="new-note"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
      </div>
      <div className="bottom-spacer"></div>
      {showModal && (
        <InputModal
          prompt="Create new note"
          onSubmit={(input) => {
            setShowModal(false);
            onCreateNote({
              authorID: userID!,
              body: input,
            })
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
