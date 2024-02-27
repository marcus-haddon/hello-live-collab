import React, { FunctionComponent } from "react";
import { Note } from "../../model";

import "./note.css";

export interface Props {
  note: Note;
  onDelete: () => void;
}

const NoteComponent: FunctionComponent<Props> = ({
  note,
  onDelete
}) => {

  return (
    <div className="note">
      <div className="inner">
        <div className="top-row">
          <div className="author">
            {note.authorID}
          </div>
          <div className="delete-button">
            <button
              onClick={onDelete}
            >
              X
            </button>
          </div>
        </div>
        
        <div className="body">
          {note.body}
        </div>
        <div className="metadata">
          <span className="synced">
            {note.synced ? "synced" : "local"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteComponent;
