# DAROYA

### A journey beyond the horizon.

DAROYA is an interactive, data-driven visual archive of India's journey into space — from the early sounding-rocket era through satellites, launch vehicles, lunar/planetary missions, science, navigation, and the road toward 2047.

## Highlights

- Cinematic 3D solar-system backdrop
- 1947 → 2026 interactive timeline
- Searchable spacecraft archive
- Launcher evolution explorer
- Mission atlas
- Space-programme statistics
- India / space-centre network
- 2047 future horizon
- Reduced-motion and WebGL fallback
- Source-aware data model

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Data note

The included data is a curated, source-backed showcase dataset for the interactive experience. Expand the structured data files to continue the archive toward exhaustive coverage.

Primary reference sources include ISRO mission, spacecraft, launcher, timeline, and centre pages.

## Compatibility fix
The launcher dataset uses numeric stage counts; RLV technology demonstrations are represented with `stages: 0` because the program is not modeled as a conventional staged orbital launcher in this dataset.
