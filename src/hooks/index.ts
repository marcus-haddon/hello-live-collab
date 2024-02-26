import { useDispatch, useStore, TypedUseSelectorHook, useSelector } from "react-redux";
import { NotesDispatch, NotesStore, NotesState } from "../state";

type DispatchFunc = () => NotesDispatch;
export const useNotesDispatch: DispatchFunc = useDispatch;
export const useNotesSelector: TypedUseSelectorHook<NotesState> = useSelector;
