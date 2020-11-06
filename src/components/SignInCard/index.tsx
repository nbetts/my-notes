import React, { useState } from "react";
import { signIn } from 'store';

const SignInCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
    } catch (error) {
      setErrorMessage(error.message);
      setSubmitting(false);
      setPassword('');
    }
  };

  return (
    <form onSubmit={submitSignIn}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit" disabled={submitting}>Sign in</button>
    </form>
  );
};

export default SignInCard;
