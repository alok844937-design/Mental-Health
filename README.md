# MindScape — Animated Mental Health Companion

This is a static demo that includes: an animated landing screen, an interactive Mood Galaxy, an Emotion Garden (journal→flowers), a Breathing Bubble, a Relax Zone, Crisis SafeRoom, and a Mood Timeline wave, plus a full-screen "Mind Journey" animation on save.

How to run

Open `index.html` in a browser (double-click or use a simple static server). For a quick local server (PowerShell):

```powershell
# from project root
python -m http.server 5500
# then open http://localhost:5500
```

Data persistence

Journal entries and last mood are stored in LocalStorage in your browser.

Notes

- Animations are implemented with CSS + lightweight JS.
- This scaffold is intended as a foundation — you can expand visuals, accessibility, and add backend sync later.