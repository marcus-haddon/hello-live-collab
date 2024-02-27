import { Reducer, ThunkDispatch, combineReducers, configureStore } from "@reduxjs/toolkit";
import { User, Note, PendingNote } from "../model";

export type NotesState = {
  notes: Note[];
  users: User[];
  userID?: string;
  latestID: number;
  logs: string[];
};

export type NotesAction = {
  type: "user/setUserID";
  payload: string;
} | {
  type: "notes/create";
  payload: PendingNote;
} | {
  type: "notes/delete";
  payload: string;
} | {
  type: "notes/reorder";
  payload: {
    origin: number;
    destination: number;
  }
} | {
  type: "notes/updateBody",
  payload: {
    noteID: string,
    newBody: string
  }
};

const initialState: NotesState = {
  notes: [...Array(20).keys()].map(n => ({
    id: n.toString(),
    body: `hello world x ${n}`,
    authorID: "test_user",
    synced: false
  })),
  users: [
    {
      id: "test_user",
      name: "Test User"
    }
  ],
  latestID: 0,
  logs: []
}

const rootReducer: Reducer<NotesState, NotesAction> = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "notes/delete": {
      return {
        ...state,
        notes: state.notes
          .filter(n => n.id !== action.payload)
      };
    }
    case "notes/create": {
      // TODO: generate id
      const latestID = state.latestID + 1;

      const newNote: Note = {
        ...action.payload,
        id: latestID.toString(),
        synced: false
      };

      return {
        ...state,
        latestID,
        notes: [...state.notes, newNote],
        synced: false
      };
    }
    case "notes/reorder": {
      alert("TODO: reorder notes")
      return state;
    }
    case "notes/updateBody": {
      const { noteID, newBody } = action.payload;
      return {
        ...state,
        notes: state.notes.map(note => note.id === noteID ? ({
          ...note,
          body: newBody
        }) : note),
        logs: [...state.logs, `Updated note ${noteID}`]
      }
    }
    case "user/setUserID": {
      return {
        ...state,
        userID: action.payload
      };
    }
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: rootReducer,
});

export type NotesStore = ReturnType<typeof store.getState>;
export type NotesDispatch = ThunkDispatch<NotesState, any, NotesAction>;
