import React, { FunctionComponent } from "react";

import "./style.css";
import { Note } from "../../model";

export interface Props {
  onCreateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (newContent: string) => void;
}

export const Notes: FunctionComponent<Props> = ({

}) => {


  return (
    <div className="notes">
      hello
    </div>
  );
};
