import { FunctionComponent, useCallback } from "react";
import { Notes } from "../notes/notes";
import { useNotesDispatch, useNotesSelector } from "../../hooks";
import { Note, PendingNote } from "../../model";
import InputModal from "../input-mopal";


const todo = (msg: string) => () => alert(`TODO: ${msg}`);

export const NotesRoute: FunctionComponent = () => {
  const notes = useNotesSelector(state => state.notes);
  const users = useNotesSelector(state => state.users);
  const userID = useNotesSelector(state => state.userID);
  const dispatch = useNotesDispatch();

  


  const setUserID = useCallback((userID: string) => {
    dispatch({
      type: "user/setUserID",
      payload: userID
    });
  }, [dispatch]);

  const deleteNote = (id: string) => {
    dispatch({
      type: "notes/delete",
      payload: id
    })
  };

  const createNote = (pending: PendingNote) => {
    dispatch({
      type: "notes/create",
      payload: pending
    })
  };

  const moveNote = (noteID: string, origin: number, destination: number) => {
    dispatch({
      type: "notes/reorder",
      payload: {
        noteID,
        origin,
        destination
      }
    })
  };

  if (!userID) {
    return (
      <InputModal
        prompt="Enter user ID"
        onCancel={() => alert("A user name is requried")}
        onSubmit={(userID) => setUserID(userID)}
      />
    );
  }

  return (
      <Notes
        notes={notes}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
        onEditNote={todo("edit note")}
        onMoveNote={moveNote}
      />
  );
};
