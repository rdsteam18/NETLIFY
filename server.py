from flask import Flask, jsonify
import json
import firebase_admin
from firebase_admin import credentials, db

# Firebase कनेक्शन सेटअप
cred = credentials.Certificate("firebase-adminsdk.json")  # 🔴 तुम्हारी Firebase JSON फाइल (डाउनलोड करो)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://animedb-c3498-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

app = Flask(__name__)

# ✅ Firebase से डेटा लाकर animeData.json अपडेट करें
@app.route('/update-json', methods=['GET'])
def update_json():
    ref = db.reference('animes')
    animes = ref.get()

    with open("animeData.json", "w", encoding="utf-8") as file:
        json.dump(animes, file, indent=4, ensure_ascii=False)

    return jsonify({"message": "✅ animeData.json Updated!"})

if __name__ == '__main__':
    app.run(debug=True)
