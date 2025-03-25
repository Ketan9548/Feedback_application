import * as React from 'react';
import { Html, Button, Head, Preview, Heading, Row, Section, Text, Container } from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html lang="en" dir='ltr'>
            <Head>
                <title>Verify Your Email</title>
            </Head>
            <Preview>Email Verification</Preview>
            <Container>
                <Section style={{ padding: '20px', textAlign: 'center' }}>
                    <Heading as="h2">Hello, {username}!</Heading>
                    <Text>Your One-Time Password (OTP) for verification is:</Text>
                    <Heading as="h3" style={{ backgroundColor: '#f3f4f6', padding: '10px', display: 'inline-block' }}>{otp}</Heading>
                    <Text>If you didn’t request this, you can ignore this email.</Text>
                    <Button
                        href={"#"}
                        style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block', marginTop: '10px' }}
                    >
                        Verify Your Email
                    </Button>
                </Section>
            </Container>
        </Html>
    );
}
