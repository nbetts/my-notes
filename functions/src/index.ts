import * as functions from 'firebase-functions';

export const isAuthed = functions.https.onCall((data, context) => {
  return context.auth ? 'Authed' : 'Unauthed';
});
