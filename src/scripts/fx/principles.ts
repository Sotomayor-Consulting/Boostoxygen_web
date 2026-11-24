// Behaviour for Principles.astro (moved out of the component so the Astro and Next builds share it).
// Principle card flip: desktop keeps the original hover interaction. On small
// touch screens the back is the default face and a tap returns to the front.
const canHover = window.matchMedia("(hover: hover)");
const mobileCards = window.matchMedia("(max-width: 809px) and (hover: none)");
const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-pcard]"));

const syncCardMode = (card: HTMLElement) => {
  card.classList.remove("is-mobile-front");
  if (mobileCards.matches) {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Mostrar título de la tarjeta");
    card.setAttribute("aria-pressed", "true");
  } else {
    card.removeAttribute("role");
    card.removeAttribute("tabindex");
    card.removeAttribute("aria-label");
    card.removeAttribute("aria-pressed");
  }
};

const toggleMobileCard = (card: HTMLElement) => {
  const showsFront = card.classList.toggle("is-mobile-front");
  card.setAttribute("aria-label", showsFront ? "Mostrar detalles de la tarjeta" : "Mostrar título de la tarjeta");
  card.setAttribute("aria-pressed", String(!showsFront));
};

cards.forEach((card) => {
  syncCardMode(card);
  card.addEventListener("mouseenter", () => canHover.matches && card.classList.add("is-flipped"));
  card.addEventListener("mouseleave", () => canHover.matches && card.classList.remove("is-flipped"));
  card.addEventListener("click", () => mobileCards.matches && toggleMobileCard(card));
  card.addEventListener("keydown", (event) => {
    if (!mobileCards.matches || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    toggleMobileCard(card);
  });
});

mobileCards.addEventListener("change", () => cards.forEach(syncCardMode));

export {};
