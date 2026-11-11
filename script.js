for (const link of document.querySelectorAll(".case-link")) {
  const card = link.closest(".case");

  card.addEventListener("click", (event) => {
    if (link.contains(event.target) || window.getSelection()?.type === "Range") return;
    link.click();
  });
}
