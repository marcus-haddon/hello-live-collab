import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
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
  notes: [],
  users: []
}

const rootReducer: Reducer<NotesState, NotesAction> = (state = initialState, action) => {
  console.log("TODO: impl reducer logic");
  return state;
}
