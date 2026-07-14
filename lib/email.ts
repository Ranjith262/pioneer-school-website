import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SMTP_TO = process.env.SMTP_TO || "pioneerpublic15@gmail.com";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

function formatBody(kind: string, data: Record<string, unknown>): string {
  const lines = Object.entries(data)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      return `${label}: ${value}`;
    });
  return lines.join("\n");
}

const subjectMap: Record<string, string> = {
  "admission-enquiry": "New Admission Enquiry",
  contact: "New Contact Form Message",
  "campus-visit": "Campus Visit Request",
  newsletter: "New Newsletter Subscription",
};

export async function sendFormEmail(kind: string, data: Record<string, unknown>) {
  const transport = getTransporter();
  if (!transport) {
    console.info(`[form:${kind}] SMTP not configured, logging only:`, JSON.stringify(data));
    return;
  }

  const subject = `[Pioneer School] ${subjectMap[kind] || kind}`;
  const text = `Form: ${kind}\nSubmitted: ${new Date().toISOString()}\n\n${formatBody(kind, data)}`;

  const replyTo = typeof data.email === "string" ? data.email : undefined;

  await transport.sendMail({
    from: SMTP_FROM,
    to: SMTP_TO,
    replyTo,
    subject,
    text,
  });
}
