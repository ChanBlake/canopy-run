# Canopy Run — Pip's Ascent

A compact browser platformer built for GitHub Pages. Guide Pip through four routes, collect every firefly, unlock the air dash, and grow from Seedling to Canopy Keeper.

## Play locally

The game has no build step or dependencies. Serve this folder with any static file server, then open `index.html` through that server.

```sh
python -m http.server 4173
```

Open `http://localhost:4173/`.

## Controls

- Move: `A` / `D` or the left / right arrow keys
- Double-jump: `W`, up arrow, or `Space`
- Air dash after route 01: `X` or `Shift`
- Pause: `Escape`
- Quick restart: `R`

Touch controls appear automatically on touch devices and smaller screens.

## Progression

Route unlocks, medals, best times, sound preference, and Pip's trail rank are stored locally in the browser. No account or network request is required after the page loads.

## Deploy to GitHub Pages

Copy the contents of this folder into `/canopy-run/` in the `chanblake.github.io` repository, or publish this repository directly with GitHub Pages.
