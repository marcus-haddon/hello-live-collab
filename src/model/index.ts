export type User = {
  id: string;
  name: string;
};

export type Note = {
  id: string;
  authorID: string;
  body: string;
  synced: boolean;
};

export type PendingNote = Omit<Note, "id" | "synced">;
