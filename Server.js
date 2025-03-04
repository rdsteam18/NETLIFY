const express = require("express");
const fs = require("fs");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Firebase Admin SDK Setup
const serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://animedb-c3498-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();
const jsonFilePath = "./animeData.json"; // JSON फाइल का पथ

// 📥 Firebase से JSON फाइल अपडेट करना
app.get("/update-json", async (req, res) => {
  try {
    const snapshot = await db.ref("animes").once("value");
    const data = snapshot.val();

    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    res.json({ message: "✅ animeData.json अपडेट हो गई!" });
  } catch (error) {
    res.status(500).json({ error: "❌ JSON अपडेट करने में समस्या आई!" });
  }
});

// 🏃‍♂️ सर्वर स्टार्ट करना
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 सर्वर रन हो रहा है: http://localhost:${PORT}`);
});
