import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
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

export const AccessEmail: React.FC<AccessEmailProps> = ({
  email,
  courseName,
  accessLink,
}) => (
  <Html>
    <Head />
    <Preview>Your Key to the Fortress: Access to {courseName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Heading style={heading}>Your Key is Forged.</Heading>
          <Text style={paragraph}>
            Thank you for your acquisition. Your payment has been confirmed and your access has been granted.
          </Text>
          <Text style={paragraph}>
            You now hold the key to the following knowledge:
          </Text>
          <Heading as="h2" style={courseTitle}>
            {courseName}
          </Heading>
          <Text style={paragraph}>
            To enter the fortress, use your personal, secure access link below. This key is bound to you. Do not share it.
          </Text>
          <Button style={button} href={accessLink}>
            Enter the Fortress
          </Button>
          <Text style={footer}>
            If the button above does not work, copy and paste this URL into your browser:
          </Text>
          <Link style={link} href={accessLink}>
            {accessLink}
          </Link>
          <Text style={footer}>
            - The Architect
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AccessEmail;

// --- Styles ---
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  color: '#ffffff',
};
const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};
const heading = {
  fontSize: '28px',
  fontWeight: 'bold' as const,
  color: '#ffffff',
};
const courseTitle = {
  fontSize: '20px',
  fontWeight: '600' as const,
  color: '#e2e2e2',
  margin: '16px 0',
}
const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#d4d4d4',
};
const button = {
  backgroundColor: '#f4c025', // Using your primary gold color
  borderRadius: '4px',
  color: '#121212', // Dark text for contrast
  fontSize: '15px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 0',
  margin: '24px 0',
};
const link = {
  color: '#0077ff',
  fontSize: '12px',
}
const footer = {
  fontSize: '14px',
  color: '#888888',
  marginTop: '32px',
};
