import Button from "components/Button";
import { Card, Form, FormField, Paragraph, TextInput, CardHeader, CardBody, Heading, Box } from "grommet";
import React, { useState } from "react";
import { signIn } from 'store';

const SignInCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitSignIn = async () => {
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
    <Card pad="medium" gap="medium" width="medium" elevation="large">
      <CardHeader pad={{ bottom: 'small' }} justify="center">
        <Heading>Sign in</Heading>
      </CardHeader>
      <CardBody>
        <Form onSubmit={submitSignIn}>
          <FormField htmlFor="email" label="Email">
            <TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
          </FormField>
          <FormField htmlFor="password" label="Password">
            <TextInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormField>
          {errorMessage && (
            <Box pad={{ vertical: 'small' }}>
              <Paragraph color="status-error">{errorMessage}</Paragraph>
            </Box>
          )}
          <Box pad={{ top: 'small' }} align="center">
            <Button primary type="submit" label="Sign in" loading={submitting} />
          </Box>
        </Form>
      </CardBody>
    </Card>
  );
};

export default SignInCard;
