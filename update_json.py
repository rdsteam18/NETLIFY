import json
import firebase_admin
from firebase_admin import credentials, firestore

# 🔥 Load Firebase Service Account JSON Key
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# 🔥 Fetch Data from Firestore
def update_json_file():
    anime_ref = db.collection("animeList")  
    docs = anime_ref.stream()

    anime_data = []  
    for doc in docs:
        anime_data.append(doc.to_dict())  

    # 🔥 Update animeData.json
    with open("animeData.json", "w", encoding="utf-8") as json_file:
        json.dump(anime_data, json_file, indent=4, ensure_ascii=False)

    print("✅ animeData.json File Updated Successfully!")

# 🔥 Run Script
update_json_file()
