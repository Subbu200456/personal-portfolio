// Dark Mode
const toggle = document.getElementById("dark-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Load Projects
async function loadProjects() {
  const res = await fetch("projects.json");
  const projects = await res.json();
  const container = document.getElementById("projects-container");

  function render(filter) {
    container.innerHTML = "";
    projects
      .filter(p => filter === "all" || p.category === filter)
      .forEach(p => {
        const div = document.createElement("div");
        div.classList.add("project");
        div.innerHTML = `
          <img src="${p.image}" alt="${p.title}">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <a href="${p.link}" target="_blank">View Project</a>
        `;
        container.appendChild(div);
      });
  }

  // Filters
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });

  render("all");
}
loadProjects();

// Contact Form (demo)
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
});
