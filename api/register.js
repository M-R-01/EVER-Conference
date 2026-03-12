import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    const trackMap = {
      "Energy Harvesting": 1,
      "EV Mobility Trends": 2,
    };

    const trackNumber = trackMap[data.TRACK];

    if (!trackNumber) {
      return res.status(400).json({ error: "Invalid track" });
    }

    const { count } = await supabase
      .from("Registrations")
      .select("*", { count: "exact", head: true })
      .eq("TRACK", data.TRACK);

    const nextNumber = count || 0;
    const padded = String(nextNumber).padStart(3, "0");

    const application_id = `EC${trackNumber}${padded}`;

    const { error } = await supabase.from("Registrations").insert([
      {
        APP_ID: application_id,
        ...data,
      },
    ]);

    if (error) throw error;

    // ✉️ SEND EMAIL
    await resend.emails.send({
      from: "NC-EVMEH <onboarding@resend.dev>",
      to: data.EMAIL,
      subject: "NC-EVMEH 2026 Registration Confirmation",
      html: `
<div style="font-family: Arial, Helvetica, sans-serif; background:#f4f6f8; padding:40px;">
  <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#0a6b3f;padding:20px;text-align:center;color:white;">
      <h2 style="margin:0;">NC-EVMEH 2026</h2>
      <p style="margin:5px 0 0;font-size:14px;">
        National Conference on EV Mobility & Energy Harvesting
      </p>
    </div>

    <!-- Body -->
    <div style="padding:30px;color:#333;line-height:1.6;">

      <p>Dear <strong>${data.NAME}</strong>,</p>

      <p>
        Thank you for registering for <strong>NC-EVMEH 2026</strong>. 
        Your registration has been received successfully.
      </p>

      <!-- Application ID -->
      <div style="background:#eef7f2;border-left:5px solid #0a6b3f;padding:15px;margin:20px 0;border-radius:5px;">
        <p style="margin:0;font-size:14px;">Your Application ID</p>
        <h2 style="margin:5px 0;color:#0a6b3f;">${application_id}</h2>
      </div>

      <!-- Registration Fee Info -->
      <p>
        <strong>Registration Category:</strong> ${data.CATEGORY?.toUpperCase()}
      </p>

      <p>
        Your payment will be verified within <strong>12 hours</strong>.
      </p>

      <!-- Payment Form Reminder -->
      <div style="background:#fff8e6;border-left:5px solid #e0a800;padding:15px;margin:20px 0;border-radius:5px;">
        <strong>Payment Confirmation Required</strong>
        <p style="margin:8px 0 0;">
          If you have not yet submitted your payment proof, please complete the
          payment details form immediately using the link below as we need it for verification.
        </p>
        <p style="margin:10px 0;">
          👉 <a href="https://forms.gle/HfbwxVzE3qobD11V8" target="_blank">
          Submit Payment Details
          </a>
        </p>
      </div>

      <!-- Paper Submission -->
      <p>Please submit your <strong>full research paper</strong> before the deadline to:</p>

      <p style="font-size:16px;">
        📧 <strong>evernitt2324@gmail.com</strong>
      </p>

      <p>
        <strong>Submission Deadline:</strong> 5th April 2026
      </p>

      ${
        data.ACCOMMODATION
          ? `
      <!-- Accommodation Section -->
      <div style="background:#f0f7ff;border-left:5px solid #0a6b3f;padding:15px;margin:20px 0;border-radius:5px;">
        <strong>Accommodation Details</strong>

        <p style="margin-top:10px;">
          You have requested accommodation during the conference.
        </p>

        <p>
          <strong>Accommodation Duration:</strong> 9th Apr, 9:00PM - 10th Apr, 6:00AM<br>
          <strong>Accommodation Fee:</strong> ₹350<br>
          <strong>Caution Deposit:</strong> ₹150 (Refundable at checkout)
        </p>

        <p>
        The accommodation fee will be collected on-site during the conference. A form will be shared with you later to confirm your accommodation details and preferences.
        Please note that accommodation is limited and will be allocated on a first-come, first-served basis. We recommend confirming your accommodation as soon as possible to secure your spot.
        </p>

        <p style="margin-bottom:0;">
          Accommodation will be provided in institute hostels. 
          Detailed instructions and room allocation will be communicated later.
        </p>
      </div>
      `
          : ""
      }

      <p>
        We look forward to your valuable contribution and participation in the conference.
      </p>

      <p style="margin-top:30px;">
        Regards,<br>
        <strong>NC-EVMEH 2026 Organizing Committee</strong>
      </p>

    </div>

    <!-- Contact Section -->
    <div style="background:#f7f7f7;padding:20px;border-top:1px solid #eee;font-size:14px;color:#333;">

      <strong>Contact Us</strong>

      <p style="margin:8px 0;">
        📞 President: +91 97911 44085<br>
        📞 Vice President: +91 63744 62626<br>
        📞 Treasurer: +91 89256 32663
      </p>

      <p style="margin:8px 0;">
        📧 Email: <strong>evernitt2324@gmail.com</strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="background:#f1f3f5;padding:15px;text-align:center;font-size:12px;color:#666;">
      © 2026 NC-EVMEH Conference • NIT Trichy
    </div>

  </div>
</div>
`,
    });

    return res.status(200).json({
      message: "Success",
      application_id,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
