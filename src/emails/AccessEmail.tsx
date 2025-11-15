import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AccessEmailProps {
  email: string;
  courseName: string;
  accessLink: string;
}

export const AccessEmail = ({ email, courseName, accessLink }: AccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Access Key to {courseName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your Access Key Has Been Forged</Heading>
        <Text style={paragraph}>
          Greetings, Operative {email},
        </Text>
        <Text style={paragraph}>
          The transaction is complete. Your access to the fortress of knowledge, **{courseName}**, has been granted.
        </Text>
        <Text style={paragraph}>
          To enter the fortress, use your personal, secure access link below. This key is your durable pass, valid for one year.
        </Text>
        <Text style={paragraph}>
          **Recommendation: Bookmark the link below or save this email for continued access to your course.**
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={accessLink}>
            Enter the Fortress
          </Button>
        </Section>
        <Text style={paragraph}>
          This key is bound to you. Guard it as you would your own blade.
        </Text>
        <Text style={paragraph}>
          — The Quartermaster
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AccessEmail;

const main = {
  backgroundColor: '#0a0a0a',
  color: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const h1 = {
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  color: '#cccccc',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const button = {
  backgroundColor: '#c00000', // A menacing red
  borderRadius: '5px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  border: '1px solid #ff4d4d',
};
