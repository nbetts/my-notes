/**
 * A user.
 * @param email email address
 */
export interface User {
  email: string;
}

/**
 * A user note.
 * @param id note ID
 * @param content content as markdown
 * @param deleted whether or not the note has been deleted
 * @param dateCreated created date
 * @param dateModified last modified date
 */
export interface Note {
  id: string;
  content: string;
  deleted: boolean;
  dateCreated: Date;
  dateModified: Date;
}
