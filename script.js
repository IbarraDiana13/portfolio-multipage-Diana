document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const closeNav = document.getElementById("close-nav");
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");

  menuToggle.addEventListener("click", function () {
    nav.classList.add("active");
    overlay.classList.add("active");
  });

  closeNav.addEventListener("click", function () {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function () {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", function () {
    document.body.setAttribute(
      "data-theme",
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
    themeToggle.innerHTML =
      document.body.getAttribute("data-theme") === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  });

  // Load activity content
  const navLinks = document.querySelectorAll(".nav-link[data-activity]");
  const activityFrame = document.getElementById("activity-frame");
  const activityTitle = document.getElementById("activity-title");
  const viewSourceBtn = document.getElementById("view-source");
  let currentActivity = "../Birthday Invitation/index.html";

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active state
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Load new activity
      currentActivity = this.getAttribute("data-activity");
      const activityName = this.querySelector("span").textContent;

      activityFrame.src = currentActivity;
      activityTitle.textContent = activityName;

      // Update view source button
      viewSourceBtn.onclick = function () {
        window.open(currentActivity, "_blank");
      };

      // Close mobile menu if open
      if (window.innerWidth <= 992) {
        nav.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  });

  // Initialize view source button
  viewSourceBtn.onclick = function () {
    window.open(currentActivity, "_blank");
  };
});
