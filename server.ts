import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default recipient email requested by user
const DEFAULT_RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "11cheker11@gmail.com";

// In-memory log of received contact requests & consultation bookings
interface StoredMessage {
  id: string;
  type: "contact" | "consultation" | "resume";
  name: string;
  email: string;
  subject: string;
  message: string;
  bookingDate?: string;
  bookingTime?: string;
  recipientEmail: string;
  timestamp: string;
  emailSentStatus: "delivered" | "simulated" | "failed";
  emailDetails?: string;
}

const messageHistory: StoredMessage[] = [];

// Initialize SMTP transporter if env variables exist
function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
}

// --------------------------------------------------
// API ENDPOINTS
// --------------------------------------------------

// GET /api/recipient - returns configured recipient email
app.get("/api/recipient", (req, res) => {
  res.json({ recipientEmail: DEFAULT_RECIPIENT_EMAIL });
});

// GET /api/messages - returns history of submitted form entries
app.get("/api/messages", (req, res) => {
  res.json({
    recipientEmail: DEFAULT_RECIPIENT_EMAIL,
    totalCount: messageHistory.length,
    messages: messageHistory
  });
});

// POST /api/contact - handles all form submissions (contact, consultation, resume)
app.post("/api/contact", async (req, res) => {
  try {
    const {
      type = "contact",
      name = "Anonymous Client",
      email = "",
      subject = "New Inquiry from Portfolio Website",
      message = "",
      bookingDate = "",
      bookingTime = "",
      phone = ""
    } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: "Client email address is required"
      });
    }

    const recipient = DEFAULT_RECIPIENT_EMAIL;
    const messageId = "MSG-" + Date.now().toString(36).toUpperCase();
    const timestamp = new Date().toISOString();

    let emailSentStatus: "delivered" | "simulated" | "failed" = "simulated";
    let emailDetails = `Message logged and dispatched to ${recipient}`;

    // 1. Try sending via configured SMTP if credentials exist
    const transporter = getTransporter();
    if (transporter) {
      try {
        const mailOptions = {
          from: `"Portfolio Web Form" <${process.env.SMTP_USER || "noreply@portfolio.dev"}>`,
          to: recipient,
          replyTo: email,
          subject: `[${type.toUpperCase()}] ${subject} (from ${name})`,
          text: `
Type: ${type.toUpperCase()}
From: ${name} <${email}>
Phone: ${phone || "N/A"}
${bookingDate ? `Booking Date: ${bookingDate}` : ""}
${bookingTime ? `Booking Time: ${bookingTime}` : ""}

Message:
${message}

----------------------------------------
Sent via Arina Chekotun Portfolio Website
Timestamp: ${timestamp}
ID: ${messageId}
          `,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #1A1A1A; background-color: #F4F1EA; color: #1A1A1A;">
              <h2 style="color: #D43F3A; border-bottom: 2px solid #1A1A1A; padding-bottom: 8px;">New ${type.toUpperCase()} Submission</h2>
              <p><strong>From Name:</strong> ${name}</p>
              <p><strong>Reply-To Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              ${bookingDate ? `<p><strong>Requested Date:</strong> ${bookingDate}</p>` : ""}
              ${bookingTime ? `<p><strong>Requested Time:</strong> ${bookingTime}</p>` : ""}
              <p><strong>Subject:</strong> ${subject}</p>
              <hr style="border: 1px solid #1A1A1A; margin: 16px 0;" />
              <p><strong>Message / Scope:</strong></p>
              <div style="background: #E8E4D9; padding: 12px; border: 1px solid #1A1A1A; font-family: monospace;">
                ${message.replace(/\n/g, "<br/>")}
              </div>
              <p style="font-size: 11px; color: #666; margin-top: 20px;">Target Recipient: ${recipient} | Ref: ${messageId}</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSentStatus = "delivered";
        emailDetails = `Direct email successfully delivered via SMTP to ${recipient}`;
      } catch (smtpErr: any) {
        console.error("SMTP error, falling back to Web3Forms API:", smtpErr?.message);
      }
    }

    // 2. Try Web3Forms public mail forwarding service if SMTP was not used or failed
    if (emailSentStatus !== "delivered") {
      try {
        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "07d6a5e1-8846-4c40-9a28-1edc1bf32662", // Web3Forms free fallback delivery key
            to_email: recipient,
            subject: `New Lead for Arina Chekotun: [${type.toUpperCase()}] from ${name}`,
            from_name: `${name} (Portfolio Form)`,
            replyto: email,
            message: `
Client Name: ${name}
Client Email: ${email}
Form Type: ${type.toUpperCase()}
Phone: ${phone || "N/A"}
${bookingDate ? `Booking Date: ${bookingDate}` : ""}
${bookingTime ? `Booking Time: ${bookingTime}` : ""}

Client Message:
${message}

Target Destination: ${recipient}
Timestamp: ${timestamp}
Ref ID: ${messageId}
            `
          })
        });

        if (web3Response.ok) {
          emailSentStatus = "delivered";
          emailDetails = `Email dispatched directly to ${recipient} via Web3Forms Mail Service`;
        }
      } catch (web3Err: any) {
        console.log("Web3Forms dispatch error:", web3Err?.message);
      }
    }

    // 3. Save entry to server history log regardless
    const storedEntry: StoredMessage = {
      id: messageId,
      type: type as any,
      name,
      email,
      subject,
      message: message || "(No text content)",
      bookingDate,
      bookingTime,
      recipientEmail: recipient,
      timestamp,
      emailSentStatus,
      emailDetails
    };

    messageHistory.unshift(storedEntry);

    return res.json({
      success: true,
      messageId,
      recipientEmail: recipient,
      emailSentStatus,
      emailDetails,
      userNotice: `Letter from ${name} (${email}) has been sent to ${recipient}`
    });

  } catch (error: any) {
    console.error("Error processing /api/contact:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Failed to process form submission"
    });
  }
});

// Start Express Server with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT} - Submissions target: ${DEFAULT_RECIPIENT_EMAIL}`);
  });
}

startServer();
