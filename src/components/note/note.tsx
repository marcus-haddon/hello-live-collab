import React, { FunctionComponent } from "react";
import { Note } from "../../model";

import "./note.css";
import { useSelector } from "react-redux";
import { useNotesSelector } from "../../hooks";

export interface Props {
  note: Note;
  onDelete: () => void;
  dragging: boolean;
  onMove: (to: number) => void;
  position: number;
}

const NoteComponent: FunctionComponent<Props> = ({
  note,
  onDelete,
  dragging,
  onMove,
  position,
}) => {
  const noteCount = useNotesSelector(state => state.notes.length);

  return (
    <div className={"note" + (dragging ? " dragging" : "")}>
      <div className="inner">
        <div className="top-row">
          <div className="author">
            {note.authorID}
          </div>
          <div className="delete-button">
            {/* <button
              className="drag-button"
              onMouseDown={onDrag}
              onMouseUp={onDrop}
            >
              move
            </button> */}
            <select
              onChange={e => {
                onMove(parseInt(e.target.value))
              }}
              value={position}
            >
              {[...Array(noteCount).keys()].map(n => (
                <option
                  value={n}
                  
                >{n}</option>
              ))}
            </select>
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
