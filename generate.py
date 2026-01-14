import os, json

files = [
    f for f in os.listdir("images")
    if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif"))
]

with open("images.json", "w") as f:
    json.dump(files, f, indent=2)

print("Generated images.json with", len(files), "files")
