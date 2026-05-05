# COMPONENTS.md — Inventaire des composants UI personnels
> Bibliothèque personnelle · 63 composants premium · Maintenu par AMOUSSOU Siméon Céphas  
> Sources : Aceternity UI · Magic UI · Créations personnelles

---

## Règle d'utilisation absolue

**Avant de créer n'importe quel composant UI, lire ce fichier.**

1. Chercher le composant dans ce catalogue
2. S'il existe → copier depuis `my_ui_component/components/ui/<catégorie>/<composant>.tsx`
3. Lire le fichier source pour connaître les props/exports exacts avant d'importer
4. Ne jamais réinventer un composant qui figure ici

---

## Chemin source de référence

```
my_ui_component/components/ui/
├── cards/          (10 composants)
├── backgrounds/    (11 composants)
├── 3d/             (5 composants)
├── text-effects/   (8 composants)
├── navigation/     (6 composants)
├── heroes/         (7 composants)
├── forms/          (3 composants)
├── modals/         (2 composants)
└── misc/           (11 composants)
```

---

## Commande de copie dans un nouveau projet

```powershell
# Copier une catégorie entière
Copy-Item "my_ui_component\components\ui\cards\" "nouveau_projet\src\components\ui\cards\" -Recurse

# Copier un seul composant
Copy-Item "my_ui_component\components\ui\heroes\lamp.tsx" "nouveau_projet\src\components\ui\heroes\"
```

---

## Dépendances obligatoires

```bash
# Base (toujours)
npm install motion framer-motion tailwind-merge clsx lucide-react @tabler/icons-react

# Composants 3D uniquement
npm install three @react-three/fiber @react-three/drei three-globe

# Composants particules uniquement
npm install @tsparticles/react @tsparticles/engine @tsparticles/slim
```

Utilitaire `cn` requis dans `src/lib/utils.ts` :
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 1. `ui/cards/` — Cartes & hover effects (10)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `bento-grid.tsx` | Grille bento style Apple | `className` | Layout asymétrique, variantes de taille |
| `card-hover-effect.tsx` | Cartes avec highlight au survol | `items: {title, description, link}[]` | Effet fond lumineux au hover |
| `card-spotlight.tsx` | Carte avec spotlight canvas | `className`, `children` | Requiert `canvas-reveal-effect` |
| `card-stack.tsx` | Stack de cartes animées | `items: {id, name, designation, content}[]`, `offset?`, `scaleFactor?` | Pile de cartes avec flip auto |
| `comet-card.tsx` | Carte avec bordure comète animée | `className`, `children` | Bordure animée en rotation |
| `direction-aware-hover.tsx` | Hover avec direction aware | `imageUrl`, `title`, `description`, `className?` | Détecte la direction d'entrée du curseur |
| `evervault-card.tsx` | Carte avec effet matrice/chiffres | `text?`, `className?` | Caractères aléatoires au hover |
| `glare-card.tsx` | Carte avec effet glare 3D | `children`, `className?` | Tilt 3D + reflet lumineux |
| `glowing-effect.tsx` | Wrapper avec bordure lumineuse | `children`, `className?`, `spread?`, `blur?` | Wrapper universel |
| `layout-grid.tsx` | Grille masonry animée | `cards: {id, content, className, thumbnail}[]` | Click pour expand |

---

## 2. `ui/backgrounds/` — Fonds animés (11)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `aurora-background.tsx` | Fond aurora boréale animé | `children`, `showRadialGradient?` | Wrapper de section |
| `background-beams.tsx` | Faisceaux de lumière animés | `className?` | Fond sombre recommandé |
| `background-boxes.tsx` | Grille de cubes colorés | `className?` | Performant avec `will-change` |
| `background-gradient-animation.tsx` | Gradient animé en boucle | `className?`, `children?` | CSS pur, léger |
| `background-gradient.tsx` | Wrapper gradient simple | `children`, `className?`, `animate?` | Gradient statique ou animé |
| `canvas-reveal-effect.tsx` | Effet de révélation canvas | `animationSpeed?`, `opacities?`, `colors?`, `dotSize?` | Requis par `card-spotlight` |
| `google-gemini-effect.tsx` | Effet lignes style Gemini | `pathLengths: MotionValue[]` | Piloté par scroll |
| `meteors.tsx` | Pluie de météores | `number?` (défaut 20) | Fond sombre uniquement |
| `sparkles.tsx` | Particules scintillantes | `id?`, `background?`, `minSize?`, `maxSize?`, `particleColor?` | Requiert tsparticles |
| `vortex.tsx` | Fond vortex tourbillonnant | `children?`, `className?`, `backgroundColor?` | Canvas animé |
| `wavy-background.tsx` | Fond vagues animées | `children`, `className?`, `containerClassName?`, `colors?`, `waveWidth?`, `backgroundFill?`, `speed?` | SVG animé |

---

## 3. `ui/3d/` — Composants 3D / WebGL (5)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `3d-globe.tsx` | Globe 3D interactif | `className?` | Requiert `data_glob.json` à la racine |
| `3d-marquee.tsx` | Défilé 3D en perspective | `images: string[]`, `className?` | Grille d'images en perspective |
| `3d-pin.tsx` | Pin 3D flottant au hover | `children`, `title?`, `href?`, `className?` | Container avec effet depth |
| `macbook-scroll.tsx` | Scroll reveal style MacBook | `src` (URL image écran), `showGradient?`, `title?`, `badge?` | Scroll-driven animation |
| `pixelated-canvas.tsx` | Canvas pixelisé interactif | `imageSrc`, `className?` | Effet pixel dissolve |

> ⚠️ **`3d-globe.tsx`** : copier aussi `my_ui_component/data_glob.json` à la racine du projet cible.

---

## 4. `ui/text-effects/` — Effets texte (8)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `colourful-text.tsx` | Texte multicolore animé | `text` | Chaque lettre change de couleur |
| `flip-words.tsx` | Mots qui s'enchaînent en rotation | `words: string[]`, `duration?`, `className?` | Transition verticale fluide |
| `glowing-stars.tsx` | Texte entouré d'étoiles | `children`, `className?` | Étoiles canvas autour du texte |
| `hero-highlight.tsx` | Surlignage texte animé | `children`, `className?` | Surlignage au rendu |
| `pointer-highlight.tsx` | Highlight qui suit le pointeur | `children`, `className?` | Fond lumineux suit le curseur |
| `text-generate-effect.tsx` | Génération mot par mot | `words`, `className?`, `filter?`, `duration?` | Apparition progressive |
| `text-reveal-card.tsx` | Carte avec texte révélé au hover | `text`, `revealText`, `children?`, `className?` | Masque révélé au hover |
| `typewriter-effect.tsx` | Effet machine à écrire | `words: {text, className?}[]`, `className?`, `cursorClassName?` | Cursor clignotant inclus |

---

## 5. `ui/navigation/` — Navigation (6)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `floating-navbar.tsx` | Navbar flottante qui apparaît au scroll | `navItems: {name, link, icon?}[]`, `className?` | Disparaît en haut, apparaît au scroll vers haut |
| `navbar-menu.tsx` | Menu navbar avec sous-menus animés | `children` + sous-composants `MenuItem`, `Menu`, `HoveredLink`, `ProductItem` | Dropdown animé Framer Motion |
| `resizable-navbar.tsx` | Navbar qui se réduit au scroll | `children`, `className?` | Logo + links rétrécissent |
| `sidebar.tsx` | Sidebar rétractable | `links: {label, href, icon, onClick?}[]`, `children`, `open?`, `setOpen?`, `animate?` | Expand/collapse avec animation |
| `sticky-banner.tsx` | Bannière sticky en haut | `children`, `className?` | Z-index élevé, sticky top |
| `tabs.tsx` | Tabs avec animation underline | `tabs: {title, value, content?}[]`, `containerClassName?`, `activeTabClassName?`, `tabClassName?`, `contentClassName?` | Indicateur animé |

---

## 6. `ui/heroes/` — Sections hero (7)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `container-scroll-animation.tsx` | Device mock révélé au scroll | `titleComponent`, `children` | Perspective 3D + scroll |
| `hero-parallax.tsx` | Hero avec grille d'images parallax | `products: {title, link, thumbnail}[]` | Scroll horizontal parallax |
| `images-slider.tsx` | Slider d'images comparaison | `images: string[]`, `children`, `overlay?`, `overlayClassName?`, `className?`, `autoplay?` | Swipe avec contexte |
| `lamp.tsx` | Hero avec lampe lumineuse | `children`, `className?` | Cône de lumière SVG animé |
| `parallax-hero-images.tsx` | Hero images avec effet parallax | `className?` | Scroll-driven transform |
| `spotlight.tsx` | Spotlight suivant le curseur | `className?`, `fill?` | SVG spotlight mousemove |
| `svg-mask-effect.tsx` | Masque SVG révélé au hover | `children`, `revealText?`, `size?`, `revealSize?`, `className?` | Zone révélée autour du curseur |

---

## 7. `ui/forms/` — Formulaires (3)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `input.tsx` | Input stylisé Shadcn | Props HTML Input standard + `className?` | Base accessible |
| `label.tsx` | Label stylisé Shadcn | Props HTML Label standard + `className?` | Toujours au-dessus du champ |
| `placeholders-and-vanish-input.tsx` | Input placeholders rotatifs + vanish | `placeholders: string[]`, `onChange`, `onSubmit` | Placeholder change + disparaît à submit |

---

## 8. `ui/modals/` — Modaux (2)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `animated-modal.tsx` | Modal avec animation d'ouverture | Sous-composants : `Modal`, `ModalTrigger`, `ModalBody`, `ModalContent`, `ModalFooter` | Context-based, pas de props drilling |
| `compare.tsx` | Comparateur avant/après | `firstImage`, `secondImage`, `className?`, `slideMode?` (`hover` ou `drag`), `initialSliderPercentage?` | Requiert sparkles |

---

## 9. `ui/misc/` — Divers (11)

| Fichier | Description | Props clés | Notes |
|---|---|---|---|
| `animated-tooltip.tsx` | Tooltip avec avatar animé | `items: {id, name, designation, image}[]` | Stack d'avatars + tooltip au hover |
| `following-pointer.tsx` | Curseur personnalisé qui suit | `children`, `className?`, `title?` | Curseur custom dans la zone |
| `hover-border-gradient.tsx` | Bordure gradient au hover | `children`, `as?`, `containerClassName?`, `className?`, `duration?`, `clockwise?` | Wrapper avec bordure animée |
| `infinite-moving-cards.tsx` | Carrousel infini (testimonials) | `items: {quote, name, title}[]`, `direction?`, `speed?`, `pauseOnHover?`, `className?` | Auto-scroll bidirectionnel |
| `moving-border.tsx` | Bordure animée en rotation | `children`, `duration?`, `rx?`, `ry?` + props HTML button | Particule qui orbit la bordure |
| `stateful-button.tsx` | Bouton avec états | `state: 'idle' \| 'loading' \| 'success' \| 'error'`, `onClick`, `children` | Transitions d'état intégrées |
| `sticky-scroll-reveal.tsx` | Contenu révélé au scroll style Notion | `content: {title, description, content?}[]`, `contentClassName?` | Sticky left + scroll right |
| `terminal.tsx` | Terminal animé | `children` (lignes de commande) | Affichage séquentiel ligne par ligne |
| `timeline.tsx` | Timeline verticale animée | `data: {title, content}[]` | Ligne de temps scroll-driven |
| `tracing-beam.tsx` | Faisceau qui trace le scroll | `children`, `className?` | Ligne SVG suit le scroll |
| `world-map.tsx` | Carte du monde SVG avec arcs | `dots?: {start: {lat, lng}, end: {lat, lng}}[]`, `lineColor?` | Arcs animés entre coordonnées |

---

## 10. Combinaisons visuellement impressionnantes

```
Hero sombre premium   : lamp + typewriter-effect + meteors
Hero SaaS moderne     : spotlight + flip-words + background-beams
Section features      : bento-grid + glowing-effect + card-spotlight
Testimonials          : infinite-moving-cards + animated-tooltip
Section scroll        : sticky-scroll-reveal + tracing-beam
Footer géo            : world-map + tracing-beam
CTA conversion        : moving-border + stateful-button
Globe réseau          : 3d-globe (avec data_glob.json)
Onboarding            : terminal + text-generate-effect
Comparaison produit   : compare + canvas-reveal-effect
```

---

*COMPONENTS.md — Inventaire automatiquement chargé par SKILL.md à chaque session design*
