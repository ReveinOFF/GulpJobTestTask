const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("hiddenLeft")) {
        entry.target.classList.add("showLeft");
      } else if (entry.target.classList.contains("hiddenRight")) {
        entry.target.classList.add("showRight");
      } else {
        entry.target.classList.add("show");
      }
    } else {
      if (entry.target.classList.contains("showLeft")) {
        entry.target.classList.remove("showLeft");
      } else if (entry.target.classList.contains("showRight")) {
        entry.target.classList.remove("showRight");
      } else {
        entry.target.classList.remove("show");
      }
    }
  });
});

const hiddenElements = document.querySelectorAll(
  ".hidden, .hiddenLeft, .hiddenRight"
);
hiddenElements.forEach((el) => observer.observe(el));
