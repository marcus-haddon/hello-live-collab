import { FunctionComponent } from "react";
import { Notes } from "../notes/notes";
import { useNotesDispatch, useNotesSelector } from "../../hooks";


const todo = (msg: string) => () => alert(`TODO: ${msg}`);

export const NotesRoute: FunctionComponent = () => {
  const notes = useNotesSelector(state => state.notes);
  const users = useNotesSelector(state => state.users);
  const dispatch = useNotesDispatch();

  return (
      <Notes
        onCreateNote={todo("create note")}
        onDeleteNote={todo("delete note")}
        onEditNote={todo("edit note")}
      />
  );
};
