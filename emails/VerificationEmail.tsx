import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Row,
  Heading,
  Text,
  Button
} from "@react-email/components";

interface VarificationEmailProps {
  username: string;
  otp: string;
}

export default function VarificationEmail({
  username,
  otp,
}: VarificationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Verification Code</title>

        <Font                               //font of the page
          fontFamily="Roboto"
          //   fallbackFontFamily="Verdena"
          fontWeight={400}
          fontStyle="normal"
          fallbackFontFamily={"Arial"}
        />
      </Head>
      <Preview>Here&apos;s your varification code: {otp}</Preview>    {/*&apos; is an HTML entity It represents a single quote (') Here&apos= here's*/}
      {/*<Preview> is a React component, email systems, it defines the email preview text in inbox  */}

      <Section>     {/* An email container Think of it as a <div> but email-safe.*/}
        <Row>       {/*<Row> → one horizontal block in the email} */}
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thanks you for registering. Please use the following verification
            code to compelete your registration
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
            <Button href= {`http://localhost:3000/verify/${otp}`}> Click to Verify</Button>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}