const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function activateTab(tab) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-selected', selected ? 'true' : 'false');
  });

  panels.forEach((panel) => {
    const selected = panel.id === tab.dataset.tab;
    panel.classList.toggle('is-active', selected);
    panel.hidden = !selected;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    const currentIndex = Array.from(tabs).indexOf(tab);
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight'
      ? (currentIndex + 1) % tabs.length
      : (currentIndex - 1 + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex]);
  });
});

document.querySelectorAll('[data-scroll-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scrollTarget);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// Convert the original wide tab navigation into a fixed left rail only after
// its normal on-page position has scrolled out of view.
const tabBar = document.querySelector('.tabs');
const tabsShell = document.querySelector('.tabs-shell');

if (tabBar && tabsShell) {
  const railToggle = document.createElement('button');
  railToggle.type = 'button';
  railToggle.className = 'tabs-rail-toggle';
  railToggle.setAttribute('aria-label', 'Open section tabs');
  railToggle.setAttribute('aria-expanded', 'false');
  railToggle.textContent = 'Tabs';
  tabBar.appendChild(railToggle);

  // A sentinel preserves the original position and gives us a reliable
  // scroll threshold even after the tab bar changes to position: fixed.
  const sentinel = document.createElement('div');
  sentinel.className = 'tabs-dock-sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  tabBar.parentNode.insertBefore(sentinel, tabBar);

  function setRailOpen(open) {
    tabBar.classList.toggle('is-open', open);
    railToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    railToggle.setAttribute('aria-label', open ? 'Close section tabs' : 'Open section tabs');
  }

  function updateDockedTabs() {
    const sentinelTop = sentinel.getBoundingClientRect().top;
    const shouldDock = sentinelTop <= 12;
    tabBar.classList.toggle('tabs--docked', shouldDock);
    document.body.classList.toggle('has-docked-tabs', shouldDock);

    if (!shouldDock) setRailOpen(false);
  }

  railToggle.addEventListener('click', () => {
    setRailOpen(!tabBar.classList.contains('is-open'));
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 760px)').matches) setRailOpen(false);
    });
  });

  window.addEventListener('scroll', updateDockedTabs, { passive: true });
  window.addEventListener('resize', updateDockedTabs);
  updateDockedTabs();
}
