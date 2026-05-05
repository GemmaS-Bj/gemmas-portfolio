---
name: design
description: >
  Skill UI/UX production-grade. Déclencher sur tout mot lié à une interface :
  "composant", "page", "landing", "dashboard", "UI", "interface", "layout",
  "formulaire", "navbar", "card", "design", "/design".
  Lire ce fichier EN PREMIER, puis lire UI-UX.md et COMPONENTS.md avant d'écrire une seule ligne de code.
  Ne jamais utiliser de couleurs hardcodées — toujours utiliser les variables CSS du projet.
  Ne jamais réinventer un composant qui existe dans COMPONENTS.md.
---

# SKILL.md — Design System

## Instruction de démarrage obligatoire

Avant tout code d'interface, dans cet ordre strict :

1. Lire `UI-UX.md` (règles de craft, patterns, anti-patterns)
2. Lire `COMPONENTS.md` (inventaire complet des 63 composants disponibles)
3. Identifier les variables CSS du projet (`--` prefixées dans le code ou dans un fichier de tokens)
4. Seulement après : écrire le code

## Raccourci `/design`

Quand l'utilisateur tape `/design [description]` :
- Appliquer automatiquement toutes les règles de `UI-UX.md`
- Consulter `COMPONENTS.md` et lister les composants qui correspondent au brief
- Produire du code prêt à l'emploi, pas du pseudo-code
- Passer la checklist de `UI-UX.md` avant de livrer

## Règle absolue sur les couleurs

**Ne jamais hardcoder une couleur.**
Toujours utiliser les variables CSS définies dans le projet.
Si aucune variable n'est visible dans le contexte, demander à l'utilisateur
où se trouvent ses tokens de design avant de coder.

```css
/* ✅ Correct */
color: var(--color-text);
background: var(--color-surface);
border-color: var(--color-border);

/* ❌ Interdit */
color: #1C1917;
background: #FAF7F2;
border-color: #E8E2D9;
```

## Règle absolue sur les composants

**Ne jamais créer un composant qui existe déjà dans `COMPONENTS.md`.**

Workflow obligatoire :
1. Chercher dans `COMPONENTS.md` si le composant ou un équivalent existe
2. Si oui → copier depuis `my_ui_component/components/ui/<catégorie>/<composant>.tsx`
3. Lire le fichier source pour connaître les props/exports exacts
4. Si non → créer en respectant les patterns de `UI-UX.md`

```
Exemples de composants DISPONIBLES (ne pas recréer) :
  Button avec états    → misc/stateful-button.tsx
  Input animé          → forms/placeholders-and-vanish-input.tsx
  Modal                → modals/animated-modal.tsx
  Navbar flottante     → navigation/floating-navbar.tsx
  Sidebar              → navigation/sidebar.tsx
  Tabs                 → navigation/tabs.tsx
  Tooltip avatars      → misc/animated-tooltip.tsx
  Carrousel            → misc/infinite-moving-cards.tsx
  Timeline             → misc/timeline.tsx
  Hero avec lampe      → heroes/lamp.tsx
  Hero spotlight       → heroes/spotlight.tsx
  Fond aurora          → backgrounds/aurora-background.tsx
  Fond beams           → backgrounds/background-beams.tsx
  Météores             → backgrounds/meteors.tsx
  Grille bento         → cards/bento-grid.tsx
  Globe 3D             → 3d/3d-globe.tsx
  Carte monde          → misc/world-map.tsx
  Texte typewriter     → text-effects/typewriter-effect.tsx
  Texte flip           → text-effects/flip-words.tsx
```

## Stack de référence

```
Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4
Framer Motion 12 (package: motion) · Three.js 0.183
Shadcn/UI · Radix UI · tsparticles 3
```
