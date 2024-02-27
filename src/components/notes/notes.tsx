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
  notes: Note[];
}

export const Notes: FunctionComponent<Props> = ({
  notes,
  onDeleteNote,
  onCreateNote
}) => {
  const userID = useNotesSelector(state => state.userID);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="notes">
      {notes.map(note => (
        <NoteComponent
          key={note.id}
          note={note}
          onDelete={() => onDeleteNote(note.id)}
        />
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
