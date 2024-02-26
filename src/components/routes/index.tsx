import { FunctionComponent } from "react";
import { Notes } from "../notes/notes";
import { useNotesDispatch, useNotesSelector } from "../../hooks";


const todo = (msg: string) => () => alert(`TODO: ${msg}`);

export const NotesRoute: FunctionComponent = () => {
  const notes = useNotesSelector(state => state.notes);
  const users = useNotesSelector(state => state.users);
  const dispatch = useNotesDispatch();

  const deleteNote = (id: string) => {
    dispatch({
      type: "notes/delete",
      payload: id
    })
  }

  return (
      <Notes
        notes={notes}
        onCreateNote={todo("create note")}
        onDeleteNote={deleteNote}
        onEditNote={todo("edit note")}
      />
  );
};
