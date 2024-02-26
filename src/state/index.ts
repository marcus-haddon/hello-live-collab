import { Reducer, ThunkDispatch, combineReducers, configureStore } from "@reduxjs/toolkit";
import { User, Note } from "../model";

export type NotesState = {
  notes: Note[],
  users: User[]
};

export type NotesAction = {
  type: "notes/create";
  payload: Note;
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
  payload: string
};

const initialState: NotesState = {
  notes: [
    {
      id: "cool-id",
      body: "hello world",
      authorID: "test_user",
      synced: false
    }
  ],
  users: [
    {
      id: "test_user",
      name: "Test User"
    }
  ]
}

const rootReducer: Reducer<NotesState, NotesAction> = (state = initialState, action) => {
  switch (action.type) {
    case "notes/delete": {
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== action.payload)
      }
    }
  }
  return state;
}


export const store = configureStore({
  reducer: rootReducer,
});

export type NotesStore = ReturnType<typeof store.getState>;
export type NotesDispatch = ThunkDispatch<NotesState, any, NotesAction>;
