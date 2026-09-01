import { createReadStream, existsSync, statSync } from "node:fs";
import { appendFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const port = 4173;
const root = process.cwd();
const appointmentsDirectory = join(root, "data");
const appointmentsFile = join(appointmentsDirectory, "appointments.jsonl");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif"
};

const sendJson = (response, status, payload) => {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
};

const readRequestBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10_000) {
        reject(new Error("Request is too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });

const createAppointment = async (request, response) => {
  try {
    const body = await readRequestBody(request);
    const payload = JSON.parse(body);
    const requiredFields = ["name", "phone", "service", "date", "time"];
    const missingField = requiredFields.find((field) => !String(payload[field] || "").trim());

    if (missingField) {
      sendJson(response, 400, { message: "Please complete every required appointment field." });
      return;
    }

    const phoneDigits = String(payload.phone).replace(/[^\d]/g, "");
    if (phoneDigits.length < 10) {
      sendJson(response, 400, { message: "Please enter a valid phone number." });
      return;
    }

    const reference = `SBS-${Date.now().toString(36).toUpperCase()}`;
    const appointment = {
      reference,
      receivedAt: new Date().toISOString(),
      name: String(payload.name).trim().slice(0, 100),
      phone: String(payload.phone).trim().slice(0, 30),
      service: String(payload.service).trim().slice(0, 100),
      date: String(payload.date).trim().slice(0, 20),
      time: String(payload.time).trim().slice(0, 20),
      message: String(payload.message || "").trim().slice(0, 2_000)
    };

    await mkdir(appointmentsDirectory, { recursive: true });
    await appendFile(appointmentsFile, `${JSON.stringify(appointment)}\n`, "utf8");
    sendJson(response, 201, { reference });
  } catch (error) {
    const message = error instanceof SyntaxError ? "Please send a valid appointment request." : "We could not save your appointment request.";
    sendJson(response, 500, { message });
  }
};

const server = createServer((request, response) => {
  if (request.method === "POST" && request.url === "/api/appointments") {
    createAppointment(request, response);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
    return;
  }

  const urlPath = request.url === "/" ? "/index.html" : request.url;
  const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    const indexPath = join(root, "index.html");
    if (existsSync(indexPath)) {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      createReadStream(indexPath).pipe(response);
      return;
    }
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    "Cache-Control": "no-store"
  });

  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  process.stdout.write(`Salon preview available at http://127.0.0.1:${port}\n`);
});
