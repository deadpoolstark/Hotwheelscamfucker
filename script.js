// 👇 Put your image filenames here
const images = [
  "cat.png",
  "dog.jpg",
  "meme_01.png",
  "example.jpeg"
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");

function render(imagesToShow) {
  gallery.innerHTML = "";

  imagesToShow.forEach(name => {
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

  const filtered = images.filter(name =>
    name.toLowerCase().includes(q)
  );

  render(filtered);
});

// Initial render
render(images);
