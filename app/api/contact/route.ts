import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  website?: string;
};

const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? 'jimtechai30@gmail.com';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export async function POST(request: Request) {
  try {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return Response.json({ message: 'Please submit a valid contact request.' }, { status: 400 });
    }
    const body = typeof payload === 'object' && payload !== null ? payload as ContactPayload : {};
    const readField = (value: unknown, maximumLength: number) =>
      typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';
    const name = readField(body.name, 120);
    const email = readField(body.email, 254);
    const phone = readField(body.phone, 40);
    const company = readField(body.company, 160);
    const service = readField(body.service, 120);
    const budget = readField(body.budget, 100);
    const timeline = readField(body.timeline, 100);
    const message = readField(body.message, 5000);
    const website = readField(body.website, 200);

    if (website) {
      return Response.json({ message: 'Your message has been sent.' }, { status: 200 });
    }

    if (!name || !email || !message) {
      return Response.json({ message: 'All fields are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (message.length < 10) {
      return Response.json({ message: 'Please tell us a little more about your project.' }, { status: 400 });
    }

    const details = [
      ['Phone', phone],
      ['Company', company],
      ['Service', service],
      ['Budget range', budget],
      ['Timeline', timeline],
    ].filter(([, value]) => value);
    const messageBody = `${details.map(([label, value]) => `${label}: ${value}`).join('\n')}${details.length ? '\n\n' : ''}Project description:\n${message}`;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM ?? smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
      const fallbackResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL_TO)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          service,
          budget,
          timeline,
          message: messageBody,
          _subject: `New Contact Form Message from ${name}`,
        }),
      });

      if (!fallbackResponse.ok) {
        return Response.json(
          { message: 'Email service is not configured yet. Please set SMTP variables or use fallback email service.' },
          { status: 500 }
        );
      }

      return Response.json({ message: 'Your message has been sent.' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n${details.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nProject description:\n${message}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${details.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value ?? '')}</p>`).join('')}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll('\n', '<br/>')}</p>
      `,
    });

    return Response.json({ message: 'Your message has been sent.' }, { status: 200 });
  } catch (error) {
    console.error('Contact form send error:', error);
    return Response.json({ message: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}