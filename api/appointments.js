export default async function handler(req, res) {
  // Enable CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const payload = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
      const requiredFields = ["name", "phone", "service", "date", "time"];
      const missingField = requiredFields.find((field) => !String(payload[field] || "").trim());

      if (missingField) {
        return res.status(400).json({ message: "Please complete every required appointment field." });
      }

      const phoneDigits = String(payload.phone).replace(/[^\d]/g, "");
      if (phoneDigits.length < 10) {
        return res.status(400).json({ message: "Please enter a valid 10-digit phone number." });
      }

      const reference = `SBS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      return res.status(200).json({
        reference,
        receivedAt: new Date().toISOString(),
        message: "Appointment request received successfully."
      });
    } catch (error) {
      return res.status(500).json({ message: "We could not save your appointment request." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
