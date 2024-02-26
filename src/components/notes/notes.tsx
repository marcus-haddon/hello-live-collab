import React, { FunctionComponent } from "react";

import "./style.css";
import { Note } from "../../model";
import NoteComponent from "../note";

export interface Props {
  onCreateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (newContent: string) => void;
  notes: Note[];
}

export const Notes: FunctionComponent<Props> = ({
  notes,
  onDeleteNote
}) => {

  return (
    <div className="notes">
      {notes.map(note => (
        <NoteComponent
          note={note}
          onDelete={() => onDeleteNote(note.id)}
        />
      ))}
    </div>
  );
};
