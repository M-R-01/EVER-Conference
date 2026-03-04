import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    // Map track to number
    const trackMap = {
      "Energy Harvesting": 1,
      "EV Mobility Trends": 2,
    };

    const trackNumber = trackMap[data.TRACK];

    if (!trackNumber) {
      return res.status(400).json({ error: "Invalid track" });
    }

    // Count existing registrations for this track
    const { count, error: countError } = await supabase
      .from("Registrations")
      .select("*", { count: "exact", head: true })
      .eq("TRACK", data.TRACK);

    if (countError) throw countError;

    const nextNumber = count || 0;

    // Pad to 3 digits
    const padded = String(nextNumber).padStart(3, "0");

    const application_id = `EC${trackNumber}${padded}`;

    const { error } = await supabase
      .from("Registrations")
      .insert([{
        APP_ID: application_id,
        ...data,
      }]);

    if (error) throw error;

    return res.status(200).json({
      message: "Success",
      application_id
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}