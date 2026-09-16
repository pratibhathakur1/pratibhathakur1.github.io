// Page changes use ordinary links. This script only opens stories on the current page.
const legacyRoutes = { kullu: '/', chandigarh: '/chandigarh/', noida: '/noida-delhi/', goa: '/goa/' };
if (location.pathname === '/' && legacyRoutes[location.hash.slice(1)]) {
  location.replace(legacyRoutes[location.hash.slice(1)]);
}
for (const trigger of document.querySelectorAll('[data-open-memory]')) {
  const dialog = document.getElementById(trigger.dataset.openMemory);
  if (!dialog) continue;
  trigger.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('close', () => trigger.focus({ preventScroll: true }));
  for (const closer of dialog.querySelectorAll('[data-close-memory]')) {
    closer.addEventListener('click', () => dialog.close());
  }
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
}
const chapterMenu = document.querySelector('.chapter-menu');
document.addEventListener('click', event => {
  if (chapterMenu && !chapterMenu.contains(event.target)) chapterMenu.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && chapterMenu?.open) {
    chapterMenu.open = false;
    chapterMenu.querySelector('summary').focus();
  }
});
