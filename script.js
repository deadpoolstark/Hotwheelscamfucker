const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const sortBtn = document.getElementById("sortBtn");

let allImages = [];
let sortMode = "az";

/* ---------- Modal ---------- */

const modal = document.createElement("div");
modal.id = "modal";
modal.style.display = "none";
modal.innerHTML = `
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <img id="modal-img">
    <div class="modal-actions">
      <a id="download-btn">Download</a>
      <button id="close-btn">Close</button>
    </div>
  </div>
`;
document.body.appendChild(modal);

const modalImg = document.getElementById("modal-img");
const downloadBtn = document.getElementById("download-btn");
const closeBtn = document.getElementById("close-btn");

/* ---------- Modal styles ---------- */

const style = document.createElement("style");
style.textContent = `
#modal { position: fixed; inset: 0; z-index: 9999; }

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
}

.modal-content {
  position: relative;
  background: #4251AE;
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #D42F41;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 8px;
}

.modal-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.modal-actions a,
.modal-actions button {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #2C84C7;
  color: #F1D74D;
  text-decoration: none;
  cursor: pointer;
}

.modal-actions a:hover,
.modal-actions button:hover {
  background: #D42F41;
}
`;
document.head.appendChild(style);

/* ---------- Logic ---------- */

function openModal(filename) {
  const cacheBust = Date.now();
  const src = `images/${filename}?v=${cacheBust}`;

  modalImg.src = src;
  downloadBtn.href = src;
  downloadBtn.download = filename;

  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  modalImg.src = "";
}

function sortImages(list) {
  return [...list].sort((a, b) =>
    sortMode === "az" ? a.localeCompare(b) : b.localeCompare(a)
  );
}

function render(images) {
  gallery.innerHTML = "";

  images.forEach(name => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = `images/${name}?v=${Date.now()}`;
    img.alt = name;
    img.addEventListener("click", () => openModal(name));

    const label = document.createElement("div");
    label.className = "filename";
    label.textContent = name;

    card.appendChild(img);
    card.appendChild(label);
    gallery.appendChild(card);
  });
}

function updateView() {
  const q = searchInput.value.toLowerCase();
  let filtered = allImages.filter(n => n.toLowerCase().includes(q));
  filtered = sortImages(filtered);
  render(filtered);
}

/* ---------- Events ---------- */

searchInput.addEventListener("input", updateView);

sortBtn.addEventListener("click", () => {
  sortMode = sortMode === "az" ? "za" : "az";
  sortBtn.classList.toggle("desc", sortMode === "za");
  updateView();
});

closeBtn.addEventListener("click", closeModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* ---------- Init ---------- */

fetch("images.json?v=" + Date.now())
  .then(res => res.json())
  .then(data => {
    allImages = data;
    updateView();
  })
  .catch(err => console.error("Failed loading images.json:", err));
