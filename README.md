# T001 — AI Café Project Purpose

A responsive, GitHub Pages-ready webpage that records the purpose and implementation blueprint of the AI Café project.

## Included

- Two-tab experience: **Our Purpose** and **Page Blueprint**
- Responsive layout for mobile, tablet, and laptop
- Browser-based text-to-speech narration
- Pause, resume, restart, and speed controls
- Accessible tabs and keyboard navigation
- Project metadata and Mission Control reference

## Run locally

Open `index.html` directly in a modern browser, or use a local web server.

Example with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create or open the AI Café repository.
2. Copy this folder into the repository.
3. Commit and push the files.
4. In GitHub, open **Settings → Pages**.
5. Choose **Deploy from a branch**.
6. Select the branch and folder containing `index.html`.

## Audio note

The current version uses the browser's built-in speech synthesis. A professionally recorded or AI-generated audio file can later be added under `assets/audio/`.


## Version 1.1 — Purpose fidelity update

The **Our Purpose** tab now fully matches the approved T001 purpose PDF, including:

- the separate Proposed Purpose Statement,
- the full Stage 4 agent capabilities,
- the personal wording for Stage 1, and
- the active learner wording for Stage 3.


## Version 1.3 update

- Added a new opening **Value Proposition** tab.
- Prominently features the core promise: “AI Café helps curious learners understand, experiment with, and build using AI—step by step, without fear, until they can work with it independently.”
- Added six learner benefits and a clear learner-transformation path.

### Version 1.4 — Scroll-docked navigation
- The full tab layout remains visible at the beginning of the page.
- After scrolling past it, the tabs become a fixed, vertically stacked navigation rail on the left.
- On mobile, the rail becomes a compact rotated slide-out column with a `Tabs` handle.
-Adding a small line to track "Write the one-line value proposition" seperatly in git hub push
