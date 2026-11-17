/** A comment pinned to a point on a page of a document. */
export interface PinComment {
  id: string;
  page: number;
  x: number; // 0..1 of page width
  y: number; // 0..1 of page height
  name: string;
  body: string;
  createdAt: string;
}

/** A pin the user has placed but not yet posted. */
export interface PinDraft {
  page: number;
  x: number;
  y: number;
}
