import Button from "components/Button";
import { Form, FormField, Text, TextInput, Heading, Box } from "grommet";
import React, { useState } from "react";
import { signIn } from 'store';

const SignInCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = async () => {
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
    <Box pad="medium" gap="medium" width="medium" elevation="large" align="center">
      <Heading>Sign in</Heading>
      <Box fill>
        <Form onSubmit={handleSignIn}>
          <FormField htmlFor="email" label="Email">
            <TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
          </FormField>
          <FormField htmlFor="password" label="Password">
            <TextInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormField>
          {errorMessage && (
            <Box pad={{ vertical: 'small' }} align="center">
              <Text color="status-error">{errorMessage}</Text>
            </Box>
          )}
          <Box pad={{ top: 'small' }} align="center">
            <Button primary type="submit" label="Sign in" loading={submitting} />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default SignInCard;
