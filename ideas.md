# Priyanshu Attri — Universe Portfolio Design Brief

## Three stylistic directions

### Theme Name: Cinematic Astral Editorial
**Very Brief Intro:** A dark, art-directed space narrative that treats the portfolio like a short film: deep negative space, controlled electric accents, and editorial typography over a living starfield. It feels premium, curious, and quietly ambitious rather than like a game HUD.
**Probability:** 0.07

### Theme Name: Observatory Blueprint
**Very Brief Intro:** A high-contrast observatory interface inspired by astronomical field notes, instrument panels, and archival diagrams. The experience is precise and analytical, with fine lines, measured labels, and a restrained ink-and-ice palette.
**Probability:** 0.03

### Theme Name: Aurora Field Notes
**Very Brief Intro:** A softer cosmic direction using dusk blues, misted violet, and luminous aurora ribbons to create a reflective, human portfolio. It prioritizes warmth, storytelling, and gentle transitions over spectacle.
**Probability:** 0.09

## Chosen direction: Cinematic Astral Editorial

### Design Movement
Contemporary cinematic editorial design fused with sci-fi observatory interfaces and restrained generative art. The 3D environment is an atmospheric stage for the content, not a game-like obstacle course.

### Core Principles
1. **Negative space as atmosphere:** Empty space is intentional, allowing the text and planets to feel discovered rather than crowded.
2. **Editorial hierarchy over UI chrome:** Headlines, labels, and metrics carry the narrative; interface elements are minimal and quiet.
3. **Controlled luminosity:** Electric blue and violet are used as navigational signals and focal highlights, never as a blanket neon effect.
4. **Motion with purpose:** Camera travel, orbit, and parallax should make the story feel spatial while keeping reading comfortable and accessible.

### Color Philosophy
The base is an ink-black/navy field that creates the sensation of looking into deep space. Blue-white glints signal clarity and intelligence; ultraviolet accents mark discovery and experimentation; a muted lilac glow humanizes the otherwise technical atmosphere. Contrast is reserved for the content that matters.

### Layout Paradigm
A vertical cinematic sequence with a persistent left-side chapter rail and content anchored asymmetrically around the viewport. Each chapter occupies a wide viewport-height stage, while text appears in offset editorial blocks that feel like annotations in an observatory log. On small screens the rail becomes a compact top status strip and stages collapse into a readable flow.

### Signature Elements
- A thin vertical "flight path" with chapter numbers and a moving cyan node.
- Planetary stage cards with grain, atmospheric bloom, and fine orbital rings.
- Micro-labels such as `SECTOR / 01`, `SIGNAL LOCKED`, and `FIELD NOTE` to make the content feel catalogued.

### Interaction Philosophy
Interactions should reward curiosity without hiding information. Hovering over planets and skill orbs increases scale, reveals a short note, and adds a measured glow. Clicking a project opens a focused dossier overlay with an obvious return path. Keyboard focus and reduced-motion modes remain fully supported.

### Animation
Use slow, low-amplitude drift for ambient elements and short ease-out transitions for controls. Camera progress follows scroll with smoothing rather than snapping; chapter changes are marked by a change in lighting, orbit position, and content reveal. Avoid looping motion on every element simultaneously. Respect `prefers-reduced-motion` by disabling the camera travel and leaving an atmospheric but static composition.

### Typography System
- **Display:** Space Grotesk, 600–700, used for the name and section titles with tight tracking.
- **Body:** DM Sans, 400–500, used for descriptions and supporting copy.
- **Technical labels:** IBM Plex Mono, 500, uppercase with generous letter spacing for chapter metadata and metrics.
Hierarchy is built through size and placement rather than heavy borders or card stacks.

### Brand Essence
**Priyanshu Attri is a student developer building thoughtful AI and technology experiments from SRM University, presented as a navigable personal universe rather than a resume.**

Personality: **curious, precise, exploratory**.

### Brand Voice
Headlines are concise and cinematic. CTAs are invitations to investigate, not generic conversion language. Microcopy sounds like a field log: clear, slightly poetic, and technically grounded.

Example lines:
- “Builds ideas that leave an orbit.”
- “Open the project dossier.”

### Wordmark & Logo
A compact mark built from a tilted orbital ellipse intersecting a four-point star, with one broken segment suggesting an unfinished trajectory. The wordmark sits separately in Space Grotesk so the symbol can work as a favicon and HUD beacon.

### Signature Brand Color
**Signal Cyan — `#9BE7E8`**, a pale electric cyan that reads like a clean instrument light against the ink field and is reserved for active navigation, focus states, and key data points.

## Content commitments

All factual portfolio content will use only the supplied details. Future semester grades and achievements without supporting details will be presented as open or exploratory areas rather than fabricated claims. Project cards will be clearly framed as portfolio placeholders until real project names, descriptions, and links are provided.

## Implementation notes

The site will use a responsive CSS/canvas space scene with layered stars, orbital rings, planet-like spheres, controlled parallax, and a project dossier interaction. The experience will preserve a normal document flow underneath the cinematic layer so it remains accessible, keyboard navigable, and readable on mobile.

## Style Decisions

- Keep the color field dark, but avoid full-screen neon gradients.
- Use one large atmospheric focal object per stage rather than many competing 3D objects.
- Keep text readable on top of the scene with translucent ink panels or deliberate negative space.
- Use the same orbital ellipse motif in the mark, chapter rail, project cards, and contact portal.
