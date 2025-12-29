import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  subject: string;
  message: string;
}

function validateContactData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length < 5) {
    errors.push('Subject is required and must be at least 5 characters');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function createEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f8f9fa;
        }
        .container {
          background-color: white;
          margin: 20px;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin: -30px -30px 30px -30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .field {
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .field-label {
          font-weight: bold;
          color: #555;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .field-value {
          font-size: 16px;
          color: #333;
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          border-left: 4px solid #667eea;
        }
        .message-field {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #667eea;
          white-space: pre-wrap;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .highlight {
          background-color: #e3f2fd;
          padding: 2px 4px;
          border-radius: 2px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Contact Form Submission</h1>
          <p>Limbach Samaj Community</p>
        </div>

        <div class="field">
          <div class="field-label">👤 Name</div>
          <div class="field-value">${data.name}</div>
        </div>

        <div class="field">
          <div class="field-label">📧 Email</div>
          <div class="field-value">${data.email}</div>
        </div>

        ${data.phoneNumber ? `
        <div class="field">
          <div class="field-label">📞 Phone Number</div>
          <div class="field-value">${data.phoneNumber}</div>
        </div>
        ` : ''}

        ${data.address ? `
        <div class="field">
          <div class="field-label">🏠 Address</div>
          <div class="field-value">${data.address}</div>
        </div>
        ` : ''}

        <div class="field">
          <div class="field-label">📋 Subject</div>
          <div class="field-value">${data.subject}</div>
        </div>

        <div class="field">
          <div class="field-label">💬 Message</div>
          <div class="message-field">${data.message}</div>
        </div>

        <div class="footer">
          <p>This message was sent from the Limbach Samaj website contact form.</p>
          <p>Please respond to the sender at: <span class="highlight">${data.email}</span></p>
          <p><em>Sent on ${new Date().toLocaleString()}</em></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({
      error: 'Method not allowed. Use POST.',
      ok: false
    });
  }

  try {
    // Validate required environment variables
    if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
    console.error("SMTP configuration missing");
    return response.status(500).json({
      error: "Server configuration error",
      ok: false,
    });
  }

    // Validate request body
    const validation = validateContactData(request.body);
    if (!validation.isValid) {
      return response.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
        ok: false
      });
    }

    const contactData: ContactFormData = request.body;

    // Create transporter
    const transport = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Verify connection
    await transport.verify();

    // Create email content
    const emailHTML = createEmailHTML(contactData);

    // Email options
    const mailOptions = {
      from: `"${contactData.name}" <${process.env.SMTP_USERNAME}>`,
      to: process.env.SMTP_USERNAME,
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      html: emailHTML,
      // Also send plain text version
      text: `
        New Contact Form Submission

        Name: ${contactData.name}
        Email: ${contactData.email}
        ${contactData.phoneNumber ? `Phone: ${contactData.phoneNumber}` : ''}
        ${contactData.address ? `Address: ${contactData.address}` : ''}
        Subject: ${contactData.subject}

        Message:
        ${contactData.message}

        ---
        This message was sent from the Limbach Samaj website contact form.
        Please respond to: ${contactData.email}
              `.trim()
    };

    // Send email
    await transport.sendMail(mailOptions);

    // Success response
    return response.status(200).json({
      message: 'Thank you for your message! We will get back to you soon.',
      ok: true
    });

  } catch (error) {
    console.error('Contact form error:', error);

    // Handle specific nodemailer errors
    if (error instanceof Error) {
      if (error.message.includes('Authentication failed')) {
        return response.status(500).json({
          error: 'Email service temporarily unavailable',
          ok: false
        });
      }
    }

    return response.status(500).json({
      error: 'Failed to send message. Please try again later.',
      ok: false
    });
  }
}
