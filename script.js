const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");

let allImages = [];

function render(images) {
  gallery.innerHTML = "";

  images.forEach(name => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = `images/${name}`;

    const label = document.createElement("div");
    label.className = "filename";
    label.textContent = name;

    card.appendChild(img);
    card.appendChild(label);
    gallery.appendChild(card);
  });
}

searchInput.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  render(allImages.filter(n => n.toLowerCase().includes(q)));
});

fetch("images.json")
  .then(res => res.json())
  .then(data => {
    allImages = data;
    render(allImages);
  });
