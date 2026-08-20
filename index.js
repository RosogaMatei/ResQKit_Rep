const express=require('express');  
const crypto=require('crypto');

const app=express();  
const port=3000;

app.use(express.json());

// In-memory store for active session states during prototyping
const activeSessions = new Map();

// 1. INITIAL HANDSHAKE: Register device & create active session
app.post('/api/triage/session', (req, res) => {
  const { deviceId, phoneNumber } = req.body;

  // Generate a unique session ID
  const sessionId = crypto.randomUUID();

  // Create an active session record
  activeSessions.set(sessionId, {
    sessionId,
    deviceId: deviceId || "unknown",
    phoneNumber: phoneNumber || "unknown",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    location: null,
    triageData: null
  });

  console.log(`[SESSION STARTED] ID: ${sessionId} | Status: ACTIVE`);

  // Respond immediately with the newly created ID
  res.status(201).json({
    status: "success",
    sessionId: sessionId,
    message: "Session established successfully."
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

/*

Look at your last Gemini chat for this algorithm and try to implement it yourself next time.
You can find it into your last chat, delete this if needed.

*/