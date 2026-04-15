# Pütter — Working Rules

Personal brand site for a German consultant. Next.js 14 App Router, TypeScript, Tailwind, Framer Motion, GSAP (isolated), Canvas-based hero sequence. Deployed to Vercel from `main`.

## Hard rules (from claude-doctor feedback — do not ignore)

1. **Read before editing.** Always open the full file first. Plan all changes. Make ONE complete edit per component, not three patches. If you've edited the same file 3+ times in a single turn, stop and re-read the user's actual request.

2. **Re-read the original request every few turns.** On long tasks (especially anything involving the hero / scroll sequence), re-read the user's last 2-3 messages before each new action to make sure you haven't drifted.

3. **Verify before presenting.** Before saying "done" or pushing, confirm the change actually addresses what was asked. Run `next build`. Check that the file you edited is the file the user is looking at in production.

4. **When corrected, quote it back.** If the user pushes back, stop, re-read their message verbatim, and briefly reflect their constraint before editing. Don't assume you understood on first read.

5. **Self-debug, don't ask.** If a build, push, or command fails, diagnose and fix. Don't stop to confirm unless the next step is genuinely destructive (force push, delete a branch, drop data).

## Branch & deploy

- Develop on `claude/build-putter-website-8Jl8o`. After each logical chunk, also push to `main` — Vercel deploys from `main`.
- Never force-push `main`.
- Commit messages: explain the why, not just the what.

## Architecture invariants

- **HeroSequence.tsx** is THE page header. It owns the canvas frame-by-frame scroll animation (292 frames under `/public/raft/seq/01-04/frame-NNN.jpg`) and the opening CTAs. Don't re-introduce a separate Hero above it. Don't put a second scroll-scrubbing section later in the page.
- **Palette is locked**: `--water #7DD8D0`, `--sand #E8C5B8`, `--sky #C5E8E5`, `--wood #5C3D2E`, `--rope #C4A882`, `--cream #F5EDD8`, `--white #F0EDE8`, `--text #2C2015`, `--text-muted #8C7B6B`. No pure black, no pure white, no hype-purple.
- **Fonts**: EB Garamond (serif headlines, both roman + italic) + Rubik (body). Do NOT switch to Inter. Do NOT re-introduce Instrument Serif or Plus Jakarta Sans — that was v1.
- **Logo**: `components/Logo.tsx` (wordmark) and `components/LogoMark.tsx` (mark only). Both use `currentColor`. Recolor via parent CSS `color`. Never use `<img src="Pütter-Final-01.svg">` because the umlaut filename is URL-fragile.
- **taste-skill values**: DESIGN_VARIANCE=10, MOTION_INTENSITY=10, VISUAL_DENSITY=3. Asymmetric layouts, magnetic/physics motion, luxurious whitespace.

## Copywriting / DACH rules

- **No scarcity theater.** Never write "Only 2 spots left" or "Q2 2025 · 2 von 4 Plätzen frei". The 4-clients-per-quarter cap is framed as *selectivity*, not urgency: "Bewerbung statt Buchung", "Handwerk vor Volumen", "Nicht alles lässt sich skalieren".
- **Business model**: 1:1 high-ticket consulting only. No events, no cohorts, no courses. Reference brand is Philip Semmelroth, not Kreuter/Schäfer.
- **Proof hierarchy**: operator exit > client logos > revenue claims > narrative. Lead with "300k aus einer Studentenwohnung, Agentur bis 15 Leute und wieder zurück", not "6-figure months".
- **Tone**: warm editorial, anti-hype, Operator statt Berater. No English hype vocab ("skyrocket", "crush it", "unleash").
- **Headlines**: last word often in italic (EB Garamond italic) for emphasis.

## Scroll-animation specifics

- Production pattern: Canvas + preloaded JPG sequence, NOT video scrubbing. Safari's `video.currentTime` is keyframe-bound; `requestVideoFrameCallback` does not fix this.
- Frames are pre-extracted with ffmpeg at 1280w `-qscale:v 5` from `/public/raft/*.mp4`.
- LERP smoothing in canvas draw loop (ratio ~0.22) to damp touch-scroll jitter.
- Container height 500vh, sticky inner 100dvh.
- CTAs reveal on the LAST chapter only (tied to overall progress 0.78→0.95), not from the start.
- Mobile fallback: no canvas, no scroll-scrub. Static first frame + tagline + CTAs.

## GSAP / Framer Motion isolation

- Don't mix GSAP timelines and Framer Motion variants in the same component file. Separate client components are fine. HeroSequence may use canvas+rAF; child components like VoiceNote may use Framer Motion.

## Asset conventions

- Stills (Yacht branch): use `Yacht2.png`. `Yacht.png` and `floss-zu-yacht-1.mp4` are v1 — never reference.
- Preload only frame 001 in `<head>`. Don't preload 5 MB PNGs.
- Always use `next/image` for static posters (gives AVIF/WebP on Vercel).

## Build verification

Before claiming done, always:
1. `npx next build` — must be clean
2. Push to feature branch AND `main`
3. Check git status is clean (or committed)

If the stop-hook complains about untracked files, commit them immediately — don't ignore.
