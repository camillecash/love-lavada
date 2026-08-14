document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const createInstagramLink = (labelText = "@lovelavadainc") => {
  const link = document.createElement("a");
  link.className = "instagram-link";
  link.href = "https://www.instagram.com/lovelavadainc/";
  link.target = "_blank";
  link.rel = "noreferrer";
  link.setAttribute("aria-label", "Love LaVada on Instagram");

  const icon = document.createElement("span");
  icon.className = "instagram-icon";
  icon.setAttribute("aria-hidden", "true");

  link.append(icon);
  if (labelText) {
    const label = document.createElement("span");
    label.textContent = labelText;
    link.append(label);
  }
  return link;
};

document.querySelectorAll("footer > div:nth-child(3)").forEach((contactDetails) => {
  const followRow = document.createElement("div");
  followRow.className = "footer-social";
  const followLabel = document.createElement("span");
  followLabel.textContent = "Connect With Us:";
  followRow.append(followLabel, createInstagramLink(""));
  contactDetails.append(followRow);
});

document.querySelectorAll('footer a[href^="mailto:"]').forEach((emailLink) => {
  emailLink.classList.add("footer-email-link");
  const icon = document.createElement("span");
  icon.className = "mail-icon";
  icon.setAttribute("aria-hidden", "true");
  emailLink.prepend(icon);
});

const contactCard = document.querySelector(".contact-card");
if (contactCard) {
  const socialRow = document.createElement("div");
  const socialLabel = document.createElement("span");
  socialLabel.textContent = "Instagram";
  socialRow.append(socialLabel, createInstagramLink());
  contactCard.append(socialRow);
}

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("#nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Close" : "Menu";
  });
}

const motionGroups = [
  ".page-title > *",
  ".intro > *",
  ".mission-band > *",
  ".values > *",
  ".board-members-heading",
  ".board-note > *",
  ".resource-box > *",
  ".survey-split > *",
  ".contact-actions > div",
  "footer > div",
  "footer > small"
];

motionGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((item, index) => {
    if (!item.hasAttribute("data-reveal")) {
      item.setAttribute("data-reveal", index % 2 ? "right" : "left");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 90, 270)}ms`);
    }
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (header) header.classList.toggle("has-scrolled", currentScroll > 18);
  lastScroll = currentScroll;
}, { passive: true });
