import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface SampleEmailProps {
  name?: string;
  message?: string;
}

const baseUrl = "https://matratzen24-duisburg.de/";

export const SampleEmail = ({ name, message }: SampleEmailProps) => (
  <Html>
    <Head />
    <Preview>Vielen dank für ihre Nachticht.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://matratzen24-duisburg.de/_astro/logo.cpSArh2A_Z1j8hsk.webp"
          width="64"
          // height="32"
          alt="Matratzen-Outlet Duisburg Logo"
        />

        <Text style={title}>
          Vielen Dank für ihre Nachticht, <strong>{name}</strong>.
        </Text>

        <Section style={section}>
          <Text style={text}>
            Hallo <strong>{name}</strong>,
          </Text>
          <Text style={text}>
            Ihre Nachricht ist bei uns eingegangen und ein Mitarbeiter wird sich
            so schnell wie möglich bei Ihnen melden.
          </Text>
          {/* Nachricht aus dem Kontaktformular anzeigen */}
          {message && (
            <Text style={messageStyle}>
              <strong>Ihre Nachricht:</strong>
              <br />
              {message}
            </Text>
          )}
        </Section>

        <Text style={footer}>
          Matratzen-Outlet Duisburg | Ruhrorterstr. 58 in 47059 Duisburg
        </Text>
      </Container>
    </Body>
  </Html>
);

SampleEmail.PreviewProps = {
  name: "alanturing",
  message: "Ich interessiere mich für eine Matratze in Größe 140x200 cm.",
} as SampleEmailProps;

export default SampleEmail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const messageStyle = {
  marginTop: "16px",
  padding: "12px",
  backgroundColor: "#f8f9fa",
  borderRadius: "5px",
  border: "1px solid #dedede",
  fontStyle: "italic",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
