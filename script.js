document.documentElement.classList.add("js");

const yearNode = document.getElementById("yr");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const spot = document.querySelector(".spot");
let animationFrame = null;

if (spot instanceof HTMLElement) {
  window.addEventListener(
    "pointermove",
    (event) => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = requestAnimationFrame(() => {
        spot.style.setProperty("--mx", `${event.clientX}px`);
        spot.style.setProperty("--my", `${event.clientY}px`);
        animationFrame = null;
      });
    },
    { passive: true },
  );
}

const revealNodes = document.querySelectorAll(".reveal");
if (revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 },
  );

  for (const node of revealNodes) {
    observer.observe(node);
  }
}

const taglineNode = document.getElementById("typeline");
const cursorMarkup = '<span class="cursor" aria-hidden="true"></span>';
const taglineLines = [
  "I have the ability to shape the future.",
  "I build AI that behaves like a system.",
  "I ship in public. Want to build together?",
];

if (taglineNode) {
  let lineIndex = 0;
  let characterIndex = taglineLines[0].length;
  let direction = -1;

  const tick = () => {
    const currentLine = taglineLines[lineIndex];
    const visibleText = currentLine.slice(0, characterIndex);
    taglineNode.innerHTML = visibleText + cursorMarkup;

    if (direction === -1) {
      characterIndex -= 1;
      if (characterIndex <= 0) {
        direction = 1;
        lineIndex = (lineIndex + 1) % taglineLines.length;
        window.setTimeout(tick, 350);
        return;
      }
    } else {
      characterIndex += 1;
      if (characterIndex >= currentLine.length) {
        direction = -1;
        window.setTimeout(tick, 2400);
        return;
      }
    }

    window.setTimeout(tick, direction === -1 ? 28 : 42);
  };

  window.setTimeout(tick, 2600);
}

const placeholderLinks = document.querySelectorAll("[data-placeholder]");
for (const link of placeholderLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const placeholder = link.getAttribute("data-placeholder");
    window.alert(`Placeholder: drop your ${placeholder} URL into index.html where it says href="#".`);
  });
}
