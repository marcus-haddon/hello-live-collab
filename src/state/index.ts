import { Reducer, ThunkDispatch, combineReducers, configureStore } from "@reduxjs/toolkit";
import { User, Note, PendingNote } from "../model";
import { getClient } from "../sync/trimerge";

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
  notes: [...Array(0).keys()].map(n => ({
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
      const { origin, destination } = action.payload;
      if (origin === destination) return state;
      if (destination < 0 || destination > state.notes.length) {
        return {
          ...state,
          logs: [...state.logs, `Warning - invalid destination idx: ${destination}`]
        };
      }

      const toMove = state.notes.find((_, idx) => idx === origin);
      let moved = state.notes.filter((_, idx) => idx !== origin);
      moved.splice(destination, 0, toMove!);

      return {
        ...state,
        notes: moved,
        logs: [...state.logs, `Moved element ${origin} to ${destination}`]
      };
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

const roomID = window.location.pathname;

const sync = getClient(roomID);
console.log("Loaded sync client", { syncState: sync.doc });

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  sync.updateDoc(store.getState().notes, {}, {});
});

export type NotesStore = ReturnType<typeof store.getState>;
export type NotesDispatch = ThunkDispatch<NotesState, any, NotesAction>;
