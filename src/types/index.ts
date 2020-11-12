declare global {
  interface Date extends firebase.default.firestore.Timestamp {}
}

/**
 * A user.
 * @param uid user ID
 * @param email email address
 */
export interface User {
  uid: string;
  email: string;
}

/**
 * A user note.
 * @param id note ID
 * @param uid user ID
 * @param content content as markdown
 * @param dateCreated created date
 * @param dateModified last modified date
 */
export interface Note {
  id: string;
  uid: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
}
