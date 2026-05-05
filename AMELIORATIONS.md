# 📈 AMELIORATIONS.md — Journal Vivant · Projet PLUME

> **INSTRUCTION** : Lire ce fichier AVANT de coder dans toute nouvelle session.
> Mettre à jour ce fichier APRÈS chaque tâche accomplie.
> Ce fichier grandit à chaque session — c'est la mémoire technique du projet.

---

## 🗂️ Format d'une Entrée

```markdown
### [DATE] — [Titre court de la tâche]
**Contexte** : Ce qui était demandé
**Ce qui a été fait** : Actions réalisées
**Erreurs rencontrées** : Problème exact + message si dispo
**Solution appliquée** : Comment ça a été résolu
**Leçon retenue** : Ce qu'il faut retenir pour la prochaine fois
**Skill utilisée** : Nom de la skill si applicable
**Fichiers produits** : Chemins des fichiers créés
```

---

## ✅ Journal des Tâches

---

### [2026-04-26] — Polish Feed : Plume sur le dock, hover plus discret, fond unique sobre, BorderRotate sur stories, mise en forme catalogues

**Contexte** : 7 demandes ciblées sur la page `/feed` après revue visuelle :
1. Logo Plume également visible **dans le dock** (mobile + desktop)
2. Icônes du magnify dock trop grosses au survol
3. Renommer la page : titre h1 = "Accueil"
4. Plusieurs backgrounds sur la page → un fond unique et sobre dans les deux thèmes
5. Section stories doit avoir une **bordure** (composant `BorderRotate` fourni : conic-gradient animé)
6. Mise en forme des sections catalogue à améliorer
7. Toutes les icônes doivent être cohérentes avec un style dock lucide

**Ce qui a été fait** :

- **`src/components/ui/border-rotate.tsx`** (NOUVEAU) — composant fourni par le user, intégré aux conventions PLUME :
  - Palette par défaut alignée sur l'identité (bleu #2563EB, violet #7C3AED, ambre #F59E0B)
  - Background par défaut sombre (#0F172A) — laisse passer la prop pour adaptation light/dark
  - 3 modes : `auto-rotate` (par défaut), `rotate-on-hover`, `stop-rotate-on-hover`
- **`src/index.css`** — ajout du registre `@property --gradient-angle` (sans ça l'angle ne s'interpole pas, jump 0→360 instantané) + keyframes `gradient-border-rotate` + 3 utility classes pour les modes.
- **`src/pages/Feed/FeedPage.tsx`** :
  - Titre h1 = **"Accueil"** (au lieu de "La littérature africaine, à portée de plume.")
  - Suppression du gradient `heroBg` sur l'en-tête → un seul fond unique sur toute la page (`#F1F5F9` light / `#0B1120` dark, sobres et discrets)
  - Stories enveloppées dans `<BorderRotate>` avec `borderRadius=24`, `animationSpeed=10s`
  - Padding du header simplifié (plus de bloc visuel séparé)
- **`src/pages/Feed/components/StoriesBar.tsx`** :
  - Suppression du `background: sectionBg` propre → laisse le BorderRotate gérer le fond
  - Ajout d'un mini-en-tête : titre "STORIES" (uppercase, tracking) + compteur "12 auteurs en live"
- **`src/pages/Feed/components/GenreSection.tsx`** — refonte de l'en-tête de section :
  - Pastille icône 44×44 (au lieu d'un petit badge) : véritable identité visuelle de la catégorie
  - Titre + badge compteur + bouton "Tout voir" (md+) sur la même ligne
  - Tagline en dessous, séparée par un divider 1px discret
  - Padding aéré : `py-7 sm:py-9 md:py-10`
  - Box-shadow douce sur la carte cardBg pour relief sans surcharge
- **`src/components/ui/dock-magnify.tsx`** :
  - Ajout d'un slot `leading` (ReactNode) pour insérer un élément hors-magnify (logo) à gauche du dock + divider vertical
- **`src/pages/Feed/components/FeedNavbar.tsx`** :
  - Desktop : `<MagnifyDock baseSize={48} maxSize={60} leading={<PlumeLogo>}>` (au lieu de `baseSize=50, maxSize=78`) → hover beaucoup plus discret
  - Desktop : `ICON_SIZE_DESKTOP` 28 → 22 (cohérent avec maxSize réduit)
  - Mobile : ajout d'un item `Plume` en tête du `CircleMenu` avec PlumeIcon

**Vérifications** :
- `npx tsc --noEmit` → 0 erreur
- Composants UI personnels consommés en priorité : `PlumeLogo`, `PlumeIcon`, `MagnifyDock`, `CircleMenu`, `BookFanStack`, `BookCover` (règle CLAUDE.md #5)
- Pas de réinvention : le BorderRotate fourni par le user a été adapté tel quel (palette PLUME + signature TypeScript stricte)

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **`@property` est obligatoire pour animer un conic-gradient angle** — sans ça, le navigateur ne sait pas comment interpoler la valeur de la custom prop. Symptôme : l'angle reste à 0deg ou jump direct à 360deg, pas de rotation visible. La déclaration `@property --gradient-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }` rend la prop interpolable.
- **Slot `leading` > tile spéciale** — pour insérer un élément non-magnifié dans un dock magnify, un slot dédié est plus propre que de hacker la liste d'items avec un type spécial. Le composant garde sa cohérence (toutes les tiles sont magnifiées) et l'élément externe a sa propre identité visuelle (divider qui le sépare).
- **Background unique sobre > gradients par section** — une page comme `/feed` qui empile des sections différentes (stories + 10 catalogues) gagne en cohérence avec UN fond neutre. Les variations visuelles viennent des cartes/badges/contenus, pas du fond. Réduit la charge cognitive.
- **Hover trop fort = sensation de bug** — passer de 50→78 (1.56×) sur un dock magnify donnait l'impression que les tiles "explosent". 48→60 (1.25×) reste lisible et signal mais ne déstabilise pas la mise en page autour. Repère : la plupart des docks macOS sont ~1.3× au pic.
- **`@property` ne marche pas dans tous les navigateurs anciens** — Safari < 16.4 ignore. Fallback : la bordure reste affichée (gradient statique), juste sans rotation. Acceptable comme dégradation gracieuse pour PLUME (cible 2026, audience mobile principalement Chrome Android).

**Skill utilisée** : aucune (composition de composants UI existants + ajout d'un primitive UI fourni par le user)

**Fichiers créés** :
- `src/components/ui/border-rotate.tsx` (NOUVEAU)

**Fichiers modifiés** :
- `src/index.css` (@property + keyframes + utility classes)
- `src/pages/Feed/FeedPage.tsx` (titre Accueil, fond unique, BorderRotate sur stories)
- `src/pages/Feed/components/StoriesBar.tsx` (fond transparent + mini-en-tête)
- `src/pages/Feed/components/GenreSection.tsx` (en-tête refondu, pastille icône, divider)
- `src/components/ui/dock-magnify.tsx` (slot leading + divider)
- `src/pages/Feed/components/FeedNavbar.tsx` (Plume dans le dock + hover réduit + Plume dans CircleMenu)

**À noter pour le user (Céphas)** :
- Si tu trouves le fond `#F1F5F9` light trop terne, on peut ajouter une légère teinte bleutée comme `#EEF2FF` (indigo-50). Dis-le.
- Si tu veux que le BorderRotate s'arrête au survol au lieu de tourner en continu, change `animationMode="auto-rotate"` → `"stop-rotate-on-hover"` dans `FeedPage.tsx`.
- Le bouton "Tout voir" sur chaque section catalogue n'a pas encore de route câblée — à brancher quand on créera les pages genre dédiées.

🔍 Ce qu'on vient de faire
━━━━━━━━━━━━━━━━━━━━━━━━━
• `BorderRotate` → primitive UI réutilisable pour anneaux conic animés (palette PLUME par défaut)
• `@property --gradient-angle` → permet l'interpolation CSS de l'angle conic (sinon : pas d'animation)
• Slot `leading` du `MagnifyDock` → insère le logo Plume sans casser la magnification du reste
• Concept clé : **un seul background pour une page composite** → la cohérence visuelle remonte d'un cran sans coût UX

---

### [2026-04-25] — Page d'accueil /feed style Facebook (stories + 10 genres × 10 livres + détail modale)

**Contexte** : Création de la page d'accueil du feed, accessible sur `/feed` :
1. Section Stories façon Facebook (scroll horizontal, avatars d'auteurs avec ring gradient)
2. Catalogues groupés par genre — 7+ catégories minimum (livré : 10), 10 livres africains minimum par catégorie
3. Au clic sur un livre, modale de détails (titre, auteur, année, pages, prix, description, CTAs)
4. Composant carrousel inspiré du composant CardStack 21st.dev fourni par le user (fan stack 3D avec drag/swipe)

**Architecture livrée** :
- `src/pages/Feed/data/booksByGenre.ts` — types `Genre` / `Book` + 10 genres avec palette + 10 livres africains réels par genre = **100 livres** (Doguicimi, Une si longue lettre, Cahier d'un retour au pays natal, Soundjata, Things Fall Apart, Americanah, Frère d'âme, Petit pays, etc.). Couvertures réelles Goodreads pour ~10 livres connus, fallback procédural pour les autres.
- `src/components/ui/book-cover.tsx` — composant cover avec image + `onError` fallback vers un SVG procédural stylisé (gradient teinté par genre + titre découpé sur 3 lignes max + auteur + ornements). Élimine le risque d'URL cassée.
- `src/components/ui/book-fan-stack.tsx` — adaptation du composant CardStack 21st.dev :
  - `framer-motion` → `motion/react` (cohérence projet)
  - `next/link` retiré (pas de Next.js)
  - Classes Shadcn (`bg-foreground`, `text-muted-foreground`) → couleurs PLUME thème-aware via prop `isDark`
  - Props `onSelect` ajoutée pour ouvrir la modale au clic sur carte active
  - Boutons `prev`/`next` ajoutés (lucide ChevronLeft/Right) en plus des dots et du swipe
  - Conservation du fan 3D : perspective, depthPx, tiltX, spreadDeg, swipe drag avec threshold + velocity
- `src/pages/Feed/components/StoriesBar.tsx` — barre stories style Facebook : 12 auteurs africains + 1 case "Ta story" en tête. Avatar circulaire avec **ring conic-gradient** (ambre→rose→violet→bleu, signature visuelle PLUME). Scroll-snap horizontal. Scrollbar masquée par CSS injecté.
- `src/pages/Feed/components/GenreSection.tsx` — section réutilisable par genre : badge "10 œuvres", titre genre, tagline, fan stack ; taille de carte responsive (160×240 → 240×350 selon viewport).
- `src/pages/Feed/components/BookDetailModal.tsx` — modale plein écran avec backdrop blur, fermeture Esc + click extérieur, scroll lock body, animations spring. Layout 2 colonnes (cover + détails) qui passe en flex-col en mobile.
- `src/pages/Feed/FeedPage.tsx` — orchestre tout : Navbar + en-tête statistiques (10 genres · 100 œuvres) + StoriesBar **sticky** sous la navbar + boucle sur `GENRES` → un `GenreSection` chacun + Footer + modale globale.
- `src/App.tsx` — ajout route `/feed → FeedPage`.

**Décisions clés** :
- **Auteurs et titres réels** : 100% des livres sont des œuvres réelles d'auteurs africains (Senghor, Césaire, Achebe, Adichie, Mabanckou, Beyala, Pliya, Hazoumé, Kourouma, Diop, Bâ, Sembène, Couao-Zotti, Adeyemi, Okorafor, Mbembe, Fanon…) — pas de noms inventés. Le user pourra ajuster, mais la base est crédible.
- **Fallback SVG procédural pour les covers** : impossible de "scraper" 100 URLs en live. Pour les ~10 livres dont l'URL Goodreads est connue (déjà dans BookCatalogue.tsx), elle est utilisée. Pour les 90 autres, un SVG procédural avec couleur du genre est rendu — visuellement cohérent, jamais cassé. Le user peut remplacer URL par URL plus tard.
- **Fan stack 3D vs grille** : la consigne disait "regroupés ensemble et c'est au clic qu'on aura les détails sur eux" → fan stack respecte exactement ça (les 10 livres sont visibles empilés en éventail, le clic sur la carte centrale ouvre la modale). Une grille classique aurait montré un seul livre par tuile, beaucoup moins immersif et perdant l'esprit du composant 21st.dev fourni.
- **StoriesBar sticky** : reste visible quand on scrolle dans les genres → comportement Facebook attendu.
- **Tailles de cartes responsives via `useEffect` + `window.innerWidth`** plutôt que CSS only : nécessaire car BookFanStack calcule les transforms (cardSpacing, x offset…) depuis des props numériques, pas des classes Tailwind.
- **Réutilisation Footer Landing** : pas de Footer dédié au feed → cohérence visuelle, et le ThemeToggle segmented qui vient d'être livré reste accessible.

**Vérifications** :
- `npx tsc --noEmit` → 0 erreur
- Composants UI consommés : `card-stack.tsx` existant n'a PAS été utilisé directement (il fait du stack-empilé classique, pas de fan 3D) → création d'un nouveau primitive `book-fan-stack.tsx` justifiée. ColourfulText/FlipWords/etc. non pertinents ici.
- Mobile-first : breakpoints 480 / 768 / 1024 dans `GenreSection`, `px-3 sm:px-6`, `gap-2.5 sm:gap-3`, etc.

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **Adapter un composant tiers ≠ le copier** — le 21st.dev CardStack utilisait `framer-motion`, `next/link`, classes Shadcn (`bg-foreground`). Les remplacer par les équivalents projet (motion/react, anchor, palette PLUME) garde la valeur du composant sans dette technique.
- **Fallback procédural > placeholder externe** — un SVG inline avec gradient + texte est :
  - toujours rapide (pas de requête réseau)
  - jamais cassé (pas de 404)
  - cohérent visuellement (la couleur du genre s'applique)
  - léger (~1 Ko par cover vs ~50 Ko pour une vraie image)
  C'est la bonne approche pour un MVP avec données mock.
- **Mock data réelle > mock data inventée** — utiliser des œuvres vraiment existantes dans le data initial donne immédiatement une crédibilité littéraire. Le user pourra reconnaître les titres, juger l'éditorialisation, et décider plus tard quels livres garder/retirer.
- **`scrollSnapType: 'x mandatory'` + `scrollSnapAlign: 'start'`** sur les stories Facebook-like — donne le "tap" satisfaisant entre stories sans JS supplémentaire.
- **`conic-gradient` pour les rings d'avatar** — un seul `background` au lieu de plusieurs cercles SVG empilés. Le ring tourne avec `from {angle}deg`.
- **Sticky stories sous navbar fixée** — `position: sticky; top: 88px` avec un `z-index` intermédiaire (30) entre navbar (50) et contenu (10). Sans la navbar elle masquerait le sticky.
- **`onClick` à 2 modes sur fan stack** — clic sur carte active = ouvrir détail ; clic sur carte non-active = la centrer. Pattern naturel du composant 21st.dev, à conserver. Évite l'overshooting (cliquer = ouvrir ce qu'on ne voit qu'à moitié).

**Skill utilisée** : aucune (composition de composants existants + adaptation d'un composant fourni)

**Fichiers créés** :
- `src/pages/Feed/data/booksByGenre.ts` (NOUVEAU — types + 10 genres × 10 livres = 100 entries)
- `src/components/ui/book-cover.tsx` (NOUVEAU — image + SVG procédural fallback)
- `src/components/ui/book-fan-stack.tsx` (NOUVEAU — fan stack 3D adapté du 21st.dev)
- `src/pages/Feed/components/StoriesBar.tsx` (NOUVEAU — stories Facebook-style)
- `src/pages/Feed/components/GenreSection.tsx` (NOUVEAU — section par genre)
- `src/pages/Feed/components/BookDetailModal.tsx` (NOUVEAU — modale détails)
- `src/pages/Feed/FeedPage.tsx` (NOUVEAU — page principale)

**Fichiers modifiés** :
- `src/App.tsx` (ajout route `/feed`)

**À noter pour le user (Céphas)** :
- Les **10 URLs de couvertures réelles** correspondent à : Doguicimi, Soundjata, L'Aventure ambiguë, Western tchoukoutou, Un piège sans fin, Voice of two shores, L'Arbre fétiche, Les Tresseurs de corde, Kondo le requin, Americanah. Les autres affichent le SVG procédural.
- Pour ajouter une vraie cover : éditer le champ `cover` du livre dans `booksByGenre.ts`. Le composant `BookCover` détecte automatiquement et bascule.
- Le clic ouvre la modale **uniquement sur la carte active** (au centre). Pattern hérité du 21st.dev — si tu veux que tout clic ouvre la modale, dis-le, je modifie une ligne dans `BookFanStack`.
- La page est protégée par rien pour l'instant (`/feed` accessible à tous). Quand l'auth backend sera là, ajouter un guard.

---

### [2026-04-25] — ThemeToggle 3 modes + audit mobile-first + fix cases OTP

**Contexte** : 3 demandes :
1. Placer le toggle thème dans le coin inférieur droit du Footer, avec icônes Soleil / Lune / PC (3 modes au lieu de 2)
2. Vérifier l'adaptation mobile-first sur toutes les pages
3. Les cases du code OTP étaient trop grandes et dépassaient la largeur de la carte sur mobile

**Ce qui a été fait** :

**`src/contexts/ThemeContext.tsx`** — refonte pour supporter 3 modes :
- `mode: 'light' | 'dark' | 'system'` (préférence brute persistée)
- `isDark` reste exposé (résolu : si mode=system, suit `prefers-color-scheme`)
- Listener sur `matchMedia('(prefers-color-scheme: dark)')` : si l'OS bascule pendant que mode=system, l'app suit en live
- `toggleTheme` conservé pour rétrocompat (cycle binaire light↔dark, sort du mode system)
- `setMode` exposé pour les widgets segmented

**`src/components/shared/ThemeToggle.tsx`** — ajout variante `segmented` :
- 3 boutons côte à côte dans une "track" pill, icônes Sun / Monitor / Moon (lucide)
- L'option active a un fond blanc/contrasté + ombre douce (effet "pillow")
- Hover sur option idle → couleur passe à `hoverColor` puis revient (rendu propre sans re-render)
- Variantes existantes (inline, floating) préservées telles quelles → la Navbar et AuthPage continuent d'utiliser le bouton unique light↔dark sans modification

**`src/pages/Landing/sections/Footer.tsx`** :
- Bas du footer restructuré : copyright + signature regroupés à gauche, toggle segmented à droite (alignement `items-end` sur sm+ pour coller le toggle au coin inférieur droit, `items-center` en mobile pour empiler proprement)
- Padding mobile réduit (`px-5 sm:px-6 pt-14 sm:pt-16`) + grid gap mobile resserré (`gap-y-10 gap-x-6`)

**`src/pages/Auth/components/OtpStep.tsx`** — fix cases OTP qui dépassaient :
- Diagnostic : `flex-1 h-14` (56px haut) + `gap-2` + container `p-8` (64px de padding) → sur mobile 320-375px, les 6 cases consommaient trop de largeur (le `flex-1` sans `min-w-0` empêchait les inputs de se réduire en dessous de leur min-content `text-xl`)
- Correctif : `flex-1 min-w-0 max-w-[52px] aspect-square text-lg sm:text-xl` + `gap-1.5 sm:gap-2` + `justify-between` sur le wrapper. `min-w-0` permet aux inputs de descendre sous leur largeur naturelle, `max-w-[52px]` plafonne pour rester élégant sur grand écran, `aspect-square` garde de jolies proportions à toutes les largeurs.
- Container OtpStep `p-8` → `p-6 sm:p-8` (gain de 16px de chaque côté en mobile)

**`src/pages/Auth/components/IdentifierStep.tsx`** : padding container `p-8` → `p-6 sm:p-8` (cohérence avec OtpStep, plus de respiration sur mobile)

**Audit mobile-first — sections de la landing** :
Pattern récurrent corrigé partout : `px-10 py-14 md:px-16 md:py-16` → `px-5 py-10 sm:px-10 sm:py-14 md:px-16 md:py-16`. Sur 375px ça libère 40px de largeur utile (de 295 à 335). Sections concernées : `Problem.tsx`, `Solution.tsx`, `Levels.tsx`, `FAQ.tsx`, `ReaderExperience.tsx` (carte features), `BookCatalogue.tsx`, `AuthorCTA.tsx`. Padding outer `px-6 → px-4 sm:px-6`, `py-16 → py-12 sm:py-16`. Bordures arrondies adoucies en mobile : `rounded-[2.5rem] → rounded-[2rem] sm:rounded-[2.5rem]`. Gap interne réduit en mobile (`gap-12 md:gap-16 → gap-10 md:gap-16`).

**Hero** :
- Titre : `clamp(3.5rem, 9vw, 7rem)` → `clamp(2.8rem, 10vw, 7rem)` (plus respectueux des très petits écrans)
- Marges : `mt-20 → mt-12 sm:mt-20`, `mt-10 → mt-8 sm:mt-10`, `mt-20 → mt-14 sm:mt-20`, `mt-6 → mt-5 sm:mt-6`
- Sous-titre : `fontSize: 17` → `clamp(15px, 4vw, 17px)`
- Padding contenu : `px-6 → px-5 sm:px-6`, `paddingTop: 100 → 80`, `paddingBottom: 60 → 50`
- Strip logos : `gap-8 → gap-x-5 gap-y-3 sm:gap-8`
- `PaperPlane` : taille et inset rendus responsive (`width: 110/70`, `inset: 36/12`, `top/bottom: 96/80`) selon `window.innerWidth < 640`

**AuthorCTA** : portraits 230×230 fixes → ajout `max-w-full` + wrapper `w-full md:w-auto` pour ne pas déborder en mobile

**Vérifications** :
- `npx tsc --noEmit` → 0 erreur
- AuthPage (`px-4 py-12 maxWidth:440px`) déjà mobile-first natif, pas de modif
- Navbar déjà responsive (`md:hidden` mobile menu + burger), pas de modif
- Footer test grid `grid-cols-2 md:grid-cols-5` OK, déjà mobile-first

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **`flex-1` sans `min-w-0` ne se rétrécit pas en dessous de `min-content`** — pour des inputs côte à côte qui doivent partager équitablement un espace contraint, toujours `flex-1 min-w-0` sinon le contenu (font-size + padding) impose un plancher invisible et fait déborder
- **`aspect-square` > hauteur fixe pour les groupes "n cases côte à côte"** — laisse la hauteur suivre la largeur calculée par flex, donne des proportions équilibrées à toutes les tailles d'écran
- **Audit mobile-first par "diff de pattern"** — pas la peine de tester chaque page avec un emulator, identifier les patterns récurrents (`px-10 py-14 md:px-16 md:py-16`) et les corriger en cascade. Beaucoup plus rapide que page par page.
- **3 modes thème (light/dark/system) > 2 modes** — le mode `system` est attendu en 2026, surtout pour une plateforme africaine où les utilisateurs alternent jour/nuit. Le coût technique est minime (un `matchMedia` + un listener), le gain UX est concret (zéro action requise pour la majorité)
- **Préserver la rétrocompat des contrats publics** — `useTheme()` continue d'exposer `isDark` et `toggleTheme` exactement comme avant ; on n'a fait qu'ajouter `mode` et `setMode`. Aucun call site existant n'a eu besoin d'être modifié.
- **Segmented control = pattern iOS/macOS standard** — track pill + boutons rond actifs avec ombre douce. Plus expressif qu'un bouton single qui cycle à 3 états (le user perd vite le compte de l'état actuel).

**Skill utilisée** : aucune (refactor frontend pur, pas besoin de mcp__magic — Sun/Moon/Monitor déjà dans lucide-react)

**Fichiers modifiés** :
- `src/contexts/ThemeContext.tsx` (3 modes + listener system)
- `src/components/shared/ThemeToggle.tsx` (variant segmented ajoutée)
- `src/pages/Landing/sections/Footer.tsx` (toggle bas-droite + padding mobile)
- `src/pages/Auth/components/OtpStep.tsx` (fix cases OTP + padding mobile)
- `src/pages/Auth/components/IdentifierStep.tsx` (padding mobile)
- `src/pages/Landing/sections/Hero.tsx` (audit mobile-first)
- `src/pages/Landing/sections/Problem.tsx` (padding mobile)
- `src/pages/Landing/sections/Solution.tsx` (padding mobile)
- `src/pages/Landing/sections/Levels.tsx` (padding mobile)
- `src/pages/Landing/sections/FAQ.tsx` (padding mobile)
- `src/pages/Landing/sections/ReaderExperience.tsx` (padding mobile)
- `src/pages/Landing/sections/BookCatalogue.tsx` (padding mobile)
- `src/pages/Landing/sections/AuthorCTA.tsx` (padding mobile + portraits responsive)

---

### [2026-04-24] — Failles scroll Hero + ThemeToggle global + nettoyage Hero

**Contexte** : 4 demandes :
1. Les sections laissaient entrevoir le Hero pendant le scroll ("failles" entre les sections)
2. Le toggle de thème doit être disponible sur toutes les pages (pas uniquement sur la landing)
3. Utiliser des icônes propres depuis l'écosystème 21st.dev / lucide
4. Sur le Hero : supprimer les cartes flottantes des auteurs + déplacer le curseur bleu pour qu'il pointe sur le bouton "Explorer les œuvres"

**Ce qui a été fait** :
- **`src/pages/Landing/LandingPage.tsx`** : refonte radicale du stacking. Le Hero passe en `position: fixed` (plus dans le flux de scroll → ne peut PAS créer de faille). Un spacer de `100vh` pousse la 1ʳᵉ section sous le Hero, et un `<main>` en `zIndex:10` contient les sections empilées, **collées sans gap** (`marginTop:0`, `marginBottom:0`, `display:block`). La première section conserve coins arrondis + ombre haute pour l'effet de glissement.
- **`src/components/shared/ThemeToggle.tsx`** (nouveau) : bouton partagé Sun/Moon (lucide-react) avec animation de rotation au toggle via `AnimatePresence`. 2 variantes : `inline` (pour une navbar/topbar) et `floating` (position fixed top-right pour les pages sans navbar).
- **`src/components/shared/Navbar.tsx`** : remplacement des SVG Sun/Moon artisanaux par les icônes lucide `Sun`/`Moon` (style 21st.dev, cohérent avec ArrowRight déjà utilisé ailleurs).
- **`src/pages/Auth/AuthPage.tsx`** : branchée à `useTheme()`. Le spacer invisible `<div className="w-14" />` dans la topbar est remplacé par `<ThemeToggle variant="inline" size={36} />`. Couleur du lien "Retour" + texte légal bas de page adaptatifs (clair/sombre).
- **`src/pages/Landing/sections/Hero.tsx`** :
  - Suppression complète du composant `AuthorCard` + de ses 2 invocations (Couao-Zotti / Agboton)
  - `Cursor` refactorisé : ne se positionne plus en absolu par rapport au Hero (`right:120, top:52%`) mais relativement à son parent. Le bouton "Explorer les œuvres" est maintenant wrappé dans un `<div style={{position:'relative', display:'inline-block'}}>` qui contient le Cursor → il pointe précisément sur ce bouton, en bas à droite (`right:-18, bottom:-22`).

**Arbitrage volontaire** : La carte frosted glass de `AuthPage` reste **claire dans les 2 modes** — `IdentifierStep` et `OtpStep` utilisent encore des couleurs hardcodées (`#1C1917`, `rgba(255,255,255,0.5)`, etc.) ; repasser entièrement le formulaire en dark est un chantier séparé. Le toggle reste visible et fonctionnel (la `<html class="dark">` passe bien), mais visuellement sur /auth seul le chrome externe change. À traiter dans une passe dédiée si besoin.

**Leçon retenue** :
- Pour garantir qu'**aucune faille ne puisse apparaître entre des sections qui doivent s'empiler sur un Hero**, sortir le Hero du flux de scroll (`position: fixed`) et placer un spacer `100vh` est plus robuste qu'un Hero `sticky`. Avec sticky, le moindre gap entre deux sections (marge, animation `translateY`, etc.) laisse le Hero transparaître. Avec fixed + spacer, les sections empilées forment un bloc opaque continu indépendant.
- Un `ThemeToggle` centralisé évite le drift UI entre pages : une seule source pour l'icône, l'animation et les couleurs — la Navbar et AuthPage utilisent maintenant le même composant (ou des icônes lucide identiques).

**Fichiers produits / modifiés** :
- `src/components/shared/ThemeToggle.tsx` (nouveau)
- `src/components/shared/Navbar.tsx` (icônes lucide)
- `src/pages/Auth/AuthPage.tsx` (toggle intégré + chrome théma-aware)
- `src/pages/Landing/sections/Hero.tsx` (AuthorCards retirées + Cursor sur Explorer)
- `src/pages/Landing/LandingPage.tsx` (fixed Hero + spacer, déjà en place en début de session)

---

### [2026-04-24] — Plume partout + suppression badge "populaire" + icônes 21st.dev

**Contexte** : 3 demandes de cohérence visuelle :
1. Propager le rendu "Plume" stylisé (ColourfulText + Great Vibes) à TOUS les endroits où le mot apparaît visuellement (Footer, Auth, etc.) — pas que la navbar et le Hero
2. Section niveaux : retirer le badge "Le plus populaire" sur la carte Niveau 3 — argument du user : pas un système d'abonnement, le mot "populaire" n'a pas de sens ici
3. Remplacer les icônes génériques (plume, téléphone, message) par des SVG plus distinctifs façon 21st.dev — la plume Feather de lucide-react est trop banale, idem pour le téléphone "combiné" et l'enveloppe basique

**Ce qui a été fait** :
- **`src/components/shared/PlumeIcon.tsx`** (nouveau) : composant SVG plume calligraphique custom — silhouette en deux courbes Bézier (extérieure + intérieure), pointe effilée + hampe descendante, 4 barbes diagonales décoratives. Style monoline outline, props `size/color/strokeWidth`. Remplace l'icône `Feather` générique de lucide-react.
- **`src/components/shared/PlumeLogo.tsx`** : utilise PlumeIcon au lieu de Feather. Prop `theme` retirée (devenue orpheline depuis ColourfulText).
- **`src/pages/Landing/sections/Footer.tsx`** : suppression du Plu+me hardcodé + import Feather → utilise `<PlumeLogo size="md" />`. Une seule source de vérité pour le logo Plume sur tout le site.
- **`src/components/shared/Navbar.tsx`** + **`src/pages/Auth/AuthPage.tsx`** : retrait de la prop `theme` désormais inutile.
- **`src/pages/Landing/sections/Levels.tsx`** : suppression du bloc badge `{lv.featured && (...)}` "Le plus populaire". La carte Niveau 3 garde sa mise en valeur visuelle (fond bleu nuit, border bleu, ombre) — seul le badge texte disparaît.
- **`src/pages/Auth/components/IdentifierStep.tsx`** : refonte des icônes Phone/Mail :
  - PhoneIcon : ancien combiné téléphone → smartphone moderne (rectangle arrondi 6×19, speaker barre, pastille home)
  - MailIcon : enveloppe au flap basique (rect + V) → enveloppe avec flap courbé Bézier `Q 12 14`
  - PhoneSmIcon/MailSmIcon refactorés pour réutiliser PhoneIcon/MailIcon avec props `size/color="currentColor"`
- **`src/pages/Auth/components/OtpStep.tsx`** : mêmes nouvelles icônes Phone/Mail appliquées

**Vérifications** :
- `npx tsc --noEmit` → 0 erreur
- Aucun autre rendu "Plume" identifié (le grep + lecture directe Footer/Auth couvre tout). "PLUME" en majuscules dans la phrase légale d'AuthPage laissé tel quel (le styler en cursive arc-en-ciel le rendrait illisible — flag pour le user si besoin).
- "Plume Bénin" dans le strip de logos partenaires du Hero : LAISSÉ. C'est un nom de partenaire fictif, pas le logo PLUME.

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **Une source de vérité pour les éléments d'identité visuelle** : Plume logo = `<PlumeLogo>`. Un endroit pour modifier la palette/animation/police, propagation automatique partout. Footer hardcodait l'identité → c'était techniquement de la duplication d'identité visuelle, pire qu'une duplication de code.
- **Composants SVG props-driven > SVG inline copy-paste** : `<PhoneIcon size={15} color="currentColor" />` réutilisable dans tous les contextes (gros bleu, petit currentColor). Évite les 4 variantes PhoneIcon/PhoneSmIcon/MailIcon/MailSmIcon.
- **Vocabulaire métier > vocabulaire de template** : "le plus populaire" vient des sites SaaS d'abonnement (Pro/Plus/Enterprise). PLUME a des **niveaux acquis par engagement**, pas des plans achetés — le mot "populaire" n'a aucun sens. Toujours questionner les chaînes de texte héritées d'un template UI.
- **Style 21st.dev = monoline outline + courbes Bézier** : trait fin (1.5–1.6), `strokeLinecap="round"`, jamais de fill (sauf petits détails ponctuels), formes simplifiées. Très différent du style Material/lucide qui peut être plus "industriel".

**Skill utilisée** : aucune (création SVG inline, pas de mcp__magic — outil non adapté pour des icônes simples)

**Fichiers produits / modifiés** :
- `src/components/shared/PlumeIcon.tsx` (NOUVEAU — icône plume calligraphique)
- `src/components/shared/PlumeLogo.tsx` (utilise PlumeIcon, prop theme retirée)
- `src/components/shared/Navbar.tsx` (retrait prop theme orpheline)
- `src/pages/Auth/AuthPage.tsx` (retrait prop theme orpheline)
- `src/pages/Landing/sections/Footer.tsx` (utilise PlumeLogo)
- `src/pages/Landing/sections/Levels.tsx` (badge "Le plus populaire" retiré)
- `src/pages/Auth/components/IdentifierStep.tsx` (Phone/MailIcon refondus + factorisation Sm via props)
- `src/pages/Auth/components/OtpStep.tsx` (Phone/MailIcon refondus)

---

### [2026-04-24] — Navbar Plume + descente titre Hero + chasse badges IA

**Contexte** : 3 corrections fines après Hero v3 :
1. Le mot "Plume" du logo navbar doit avoir le même rendu coloré + cursive que dans le Hero (cohérence d'identité)
2. Le titre Hero était trop haut visuellement → descendre via marge top sur le titre uniquement
3. Supprimer **TOUS** les badges "IA / AI / Powered by AI / Sparkles" sur la landing → PLUME n'a aucune mention IA dans le cahier des charges, c'était un héritage du template UI initial

**Ce qui a été fait** :
- **`src/components/shared/PlumeLogo.tsx`** :
  - Import `ColourfulText` ajouté
  - Suppression de la séparation "Plu" + "me" en deux spans → un seul `<ColourfulText text="Plume" />`
  - `fontFamily: "'Great Vibes', cursive"` directement sur le wrapper
  - `fontSizes` ajustés (sm:26 / md:32 / lg:40) — Great Vibes a beaucoup de jambages, +30% par rapport aux tailles texte standards pour rester lisible
  - Prop `theme` retirée (devenue inutile, ColourfulText anime ses propres couleurs)
- **`src/pages/Landing/sections/Hero.tsx`** :
  - Ajout `mt-20` (= 80px) sur le `<motion.h1>` → descend le titre dans la moitié verticale du Hero. Le `paddingTop: 100` du conteneur reste inchangé (il sert le bloc entier).
- **`src/pages/Landing/sections/AuthorCTA.tsx`** :
  - Suppression du badge `<div>` "Assisté par l'IA · Correction · Style · Audience" + commentaire `{/* IA pill */}`
  - Import `Sparkles` retiré de lucide-react (devenu inutilisé)
- **Recherche exhaustive** des badges IA via grep : `IA|AI|powered by|generated|sparkle|robot|claude|gpt|openai|anthropic|magic|wand|machine learning|intelligence artificielle` + icônes lucide `Sparkles|Bot|Wand|Brain|Cpu` → un SEUL fichier concerné (AuthorCTA), confirmé comme nettoyé

**À noter pour le user** :
- Dans `AuthorCTA.tsx`, le **titre** ("Publiez votre histoire, l'IA vous aide à la perfectionner.") et le **paragraphe** ("Notre assistant IA analyse votre style…") mentionnent encore l'IA dans le contenu narratif. Pas touché car la consigne disait "uniquement les badges, pas les autres éléments". À reformuler dans une prochaine itération (le cahier des charges PLUME ne mentionne pas d'IA — c'est un héritage du template UI à nettoyer).

**Vérifications** :
- `npx tsc --noEmit` → 0 erreur
- Composants UI consommés tels quels (ColourfulText)

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **Cohérence d'identité = même composant** : pour rendre identique le mot "Plume" navbar/Hero, le bon réflexe est d'extraire le rendu (ColourfulText + Great Vibes) plutôt que de dupliquer le style. Ici les deux usages partagent `<ColourfulText>`, donc une future palette/animation se propage.
- **Great Vibes est cursive et "haute"** : ses tailles doivent être 25-30% plus grandes que les fontes standards pour la même surface visuelle. Penser fontSize calé sur la lisibilité réelle, pas sur la cohérence numérique avec d'autres polices.
- **Chasse IA = grep large + audit imports lucide** : ne pas se contenter du texte, vérifier aussi les imports d'icônes "magiques" (Sparkles, Bot, Wand, Brain, Cpu) qui trahissent souvent un badge IA même quand le texte ne dit pas "IA".
- **Respecter strictement la consigne du user** : ici "uniquement les badges, pas les autres éléments" → je ne touche pas au titre/paragraphe IA même si c'est cohérent de le faire. Je signale l'écart au user pour qu'il décide.

**Skill utilisée** : aucune

**Fichiers produits / modifiés** :
- `src/components/shared/PlumeLogo.tsx` (refonte avec ColourfulText + Great Vibes)
- `src/pages/Landing/sections/Hero.tsx` (mt-20 sur le h1)
- `src/pages/Landing/sections/AuthorCTA.tsx` (suppression badge IA + import Sparkles)

---

### [2026-04-24] — Hero v3 : Great Vibes local, fix trou inter-sections, relief Problem

**Contexte** : 3 bugs visuels constatés après Hero v2 :
1. Pendant le scroll, on voyait furtivement le Hero apparaître entre les sections (trou visuel)
2. La 1ʳᵉ section qui monte par-dessus le Hero (Problem — "La littérature africaine mérite bien mieux") n'avait aucun relief → l'effet de glissement passait inaperçu
3. La police Great Vibes n'apparaissait pas sur le titre Hero, malgré l'@import CSS et `fontFamily` inline
4. Titre Hero trop petit (56px) — le user voulait du grand, du marquant

**Diagnostic des 3 bugs** :
- **Bug 1 (trou)** : `motion.section` du `StackedSection` avait `initial={{ opacity: 0, y: 48 }}`. Au moment où la section entrait dans la viewport, elle était translatée de 48px vers le bas → un trou de 48px se formait en haut, révélant le Hero sticky derrière, AVANT que l'animation `whileInView` ne ramène la section à `y: 0`.
- **Bug 2** : `StackedSection` avait été simplifié à l'extrême au tour précédent (zéro radius, zéro shadow). Pour la 1ʳᵉ section uniquement, il faut le relief.
- **Bug 3** : `@import url(...)` dans le CSS est plus lent et moins fiable que `<link>` dans le `<head>`. Vite peut réordonner les @import. De plus, le user a déposé `GreatVibes-Regular.ttf` directement dans `src/assets/` — utilisons-le en local, pas Google Fonts.

**Ce qui a été fait** :
- **`index.html`** : ajouté `Great+Vibes` à l'URL Google Fonts existante (Plus Jakarta Sans + Great Vibes en un seul `<link>`, preconnect partagé)
- **`src/index.css`** :
  - Retiré `Great Vibes` de l'`@import` (redondant maintenant)
  - Ajouté `@font-face` local : `src: url('./assets/GreatVibes-Regular.ttf') format('truetype')` — Vite résout le chemin et bundle la police avec hash
  - Ajouté la classe utilitaire `.great-vibes-regular` (recommandée par Google Fonts) — applicable n'importe où
  - `--font-hero` simplifié : `'Great Vibes', cursive` (au lieu de `'Segoe UI', Georgia, serif` — fallback cursive plus cohérent avec l'esprit de la police)
- **`Hero.tsx`** :
  - Titre h1 : `className="great-vibes-regular"` + `fontFamily: "'Great Vibes', cursive"` + `fontSize: 'clamp(3.5rem, 9vw, 7rem)'` (≈ 56→112px responsive) + `lineHeight: 1.05`, `maxWidth: 1100`
- **`LandingPage.tsx`** :
  - `motion.section` → `<section>` (suppression de l'animation translateY qui causait le trou)
  - Import `motion` retiré (devenu inutile)
  - Prop `first` réintroduite : si `true`, ajoute `borderTopLeftRadius/RightRadius: 32`, `boxShadow: 0 -24px 60px -20px rgba(0,0,0,0.35)`, `overflow: hidden`
  - `<StackedSection id="services" first>` autour de `ProblemSection` uniquement

**Vérifications** :
- `npx tsc --noEmit` → 0 erreur
- Composants UI consommés tels quels (ColourfulText, FlipWords)

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **Sticky parent + sections z-index 10 = couvrent le sticky** — MAIS si une section a une animation `translateY` initiale, il y a un trou pendant la transition. Ne JAMAIS animer en `y` un wrapper qui doit couvrir un élément derrière. Si animation nécessaire, faire un fade-in opacité only OU déplacer l'animation sur le contenu intérieur (jamais sur le wrapper qui sert de "cache")
- **Polices web : `<link>` dans `<head>` > `@import` CSS** — Vite peut réordonner les @import, et le `<link>` permet preconnect natif + chargement parallèle
- **Polices critiques : self-host quand possible** — `@font-face` pointant vers un fichier local dans `src/assets/` est instantané et ne dépend pas de Google. Vite bundle automatiquement.
- **`clamp(min, vw, max)` pour la typographie responsive** — `clamp(3.5rem, 9vw, 7rem)` = 56px en mobile, 112px en desktop, fluide entre les deux. Plus propre que les media-queries.
- **Effet "carte qui monte" : juste 3 propriétés CSS** — `border-radius` + `box-shadow` (avec spread négatif pour confiner l'ombre vers le haut) + `overflow: hidden`. Pas besoin de wrapper compliqué.

**Skill utilisée** : aucune

**Fichiers produits / modifiés** :
- `index.html` (ajout Great Vibes au link Google Fonts)
- `src/index.css` (@font-face local + classe utilitaire + nettoyage @import)
- `src/pages/Landing/sections/Hero.tsx` (titre agrandi + force police)
- `src/pages/Landing/LandingPage.tsx` (suppression motion translateY, prop `first` avec relief sur Problem)

---

### [2026-04-24] — Hero v2 : ColourfulText + FlipWords, blur full-wrapper, flèches courbes

**Contexte** : Itération sur le Hero refondu plus tôt dans la session. 5 corrections ciblées demandées par Céphas après revue visuelle :
1. Suppression du badge "Plateforme littéraire béninoise"
2. Flèches paperplane à courber (Bézier doux, style titabymtn.bj — les précédentes étaient trop anguleuses)
3. Police titre = `Great Vibes` (déjà importée, juste à appliquer correctement au h1)
4. "Plume" → composant `ColourfulText` (déjà existant dans `src/components/ui/`)
5. "leurs lecteurs" → `FlipWords` avec 4 variantes, rotation 3s
6. Blur scroll : déplacer du `<img>` vers le **wrapper Hero entier** (texte, cartes, flèches blurrent aussi), via `useRef` + écriture DOM directe — pas de `setState`, pas de transition CSS
7. Sections empilées : retirer `border-radius`, `boxShadow`, chevauchement → bords droits

**Ce qui a été fait** :
- **`Hero.tsx`** :
  - Imports : `ColourfulText` (default) et `FlipWords` (named) depuis `src/components/ui/` — composants déjà présents, jamais réinventer (règle CLAUDE.md)
  - Supprimé : badge `BookMarked`, `useTypewriter` (titre statique sauf composants), `useScrollBlur` (remplacé), caret clignotant
  - Ajouté `heroRef = useRef<HTMLElement>(null)` sur la `<section>` racine
  - `useEffect` direct : `heroRef.current.style.filter = blur(${Math.min(scrollY/25, 15)}px)` — pas de `setState`, pas de transition CSS, fluide et immédiat
  - `<PaperPlane>` redessiné : courbe principale `M 8 104 C 28 70, 50 38, 96 18` (cubique douce), 3 swooshes Q décoratifs, avion en papier en `C` + `Q` (pas de fill, stroke-width 1.5, dasharray 4 2)
  - Titre h1 : `fontFamily: "'Great Vibes', serif"`, contient `<ColourfulText text="Plume" />` + texte statique + `<FlipWords words={[...]} duration={3000} />`
- **`LandingPage.tsx`** :
  - `StackedSection` simplifié : retiré `borderTopRadius`, `boxShadow`, `marginTop`, `overflow:hidden`, `first` prop
  - Garde uniquement `position: relative; z-index: 10` — sections opaques, bords droits, couvrent le Hero (z-index 0) en scrollant
- `useTypewriter.ts` laissé en place (orphelin mais réutilisable — pas de suppression sans demande explicite)

**Vérifications** :
- `npx tsc --noEmit` → 0 erreur
- Composants UI consommés tels quels, pas d'adaptation

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **`useRef` + DOM direct > `useState`** pour les effets de scroll continus — évite re-renders à chaque pixel scrollé. À retenir pour parallax, blur progressif, opacité dynamique
- **Composants UI perso D'ABORD** : `ColourfulText` et `FlipWords` étaient déjà dans `src/components/ui/` — vérification systématique avant tout code custom (règle CLAUDE.md #5)
- **Bézier en SVG** : `C x1 y1, x2 y2, x y` (cubique) ou `Q cx cy, x y` (quadratique) — donne des doodles bien plus naturels que des `L` (lignes droites). Pour des flèches "tracées à la main", toujours préférer C/Q
- **`scale(-1, -1)` SVG** = miroir diagonal complet en une transform unique, plus propre que `rotate(180)`
- **Itérer sur le visuel** : ne pas refondre, n'appliquer QUE les corrections demandées. Garder ce qui fonctionne déjà (overlay light, blobs, AuthorCards, sticky)

**Skill utilisée** : aucune

**Fichiers produits / modifiés** :
- `src/pages/Landing/sections/Hero.tsx` (refactor : badge supprimé, flèches courbes, ColourfulText + FlipWords, blur full-wrapper)
- `src/pages/Landing/LandingPage.tsx` (StackedSection simplifié, bords droits)

---

### [2026-04-24] — Refactor Hero landing : paperplane, typewriter, sticky, blur scroll

**Contexte** : Refonte de la section Hero pour 6 améliorations visuelles précises inspirées du site `titabymtn.bj` :
1. Flèches décoratives "avion en papier origami" en ocre
2. Police titre `Great Vibes` (script manuscrit) + corps en `Inter`
3. Overlay blanc semi-transparent en mode light pour lisibilité
4. Effet typewriter sur le mot "Plume" uniquement (boucle infinie)
5. Hero `position: sticky` — sections suivantes glissent par-dessus
6. Blur dynamique 0→8px sur l'image de fond pendant le scroll (0→300px)

**Ce qui a été fait** :
- `src/index.css` : import Google Fonts (`Great+Vibes`, `Poppins`, `Inter`) + 2 variables `--font-hero` et `--font-ui` exposées via `@theme`
- `src/hooks/useTypewriter.ts` (nouveau) : hook custom — écrit lettre par lettre avec `setInterval`, pause configurable, cleanup au unmount, une seule responsabilité
- `src/pages/Landing/sections/Hero.tsx` :
  - Composant interne `PaperPlane` (SVG) — trajectoire arquée pointillée + origami, variantes `topLeft` / `bottomRight` via `transform: scale(-1,-1)` pour le miroir
  - Hook local `useScrollBlur` (`window.scrollY`, listener `passive: true`, cleanup) → `filter: blur(${bgBlur}px)` appliqué **uniquement sur l'image de fond**, le contenu reste net
  - Overlay light : `<div>` absolu `rgba(255,255,255,0.55)` rendu seulement si `!isDark`, `zIndex: 1` entre image (`z-0`) et contenu (`z-10`)
  - Titre h1 : `fontFamily: var(--font-hero)`, 56px, line-height 1.1 ; `<span>` typewriter pour "Plume" + caret clignotant via `animation: breathe`
  - Toutes les polices secondaires (badge, sous-titre, boutons, logos, AuthorCard) → `var(--font-ui)`
- `src/pages/Landing/LandingPage.tsx` :
  - Hero enveloppé dans une `<div sticky top:0 zIndex:0 height:100vh>`
  - `RevealSection` renommé `StackedSection` : ajoute `zIndex: 2`, `borderTopRadius`, `boxShadow: 0 -16px 40px -20px rgba(0,0,0,0.22)`, `marginTop: -20` pour léger chevauchement
  - `overflow: hidden` sur chaque carte pour clip propre du border-radius

**Vérifications** :
- Toutes les sections suivantes (Problem, Solution, Levels, ReaderExperience, BookCatalogue, AuthorCTA, FAQ) ont déjà un background opaque (`#0F172A` / `#FFFFFF`) → le Hero sticky est correctement masqué dès qu'une section monte par-dessus
- `npx tsc --noEmit` → 0 erreur
- Composants `src/components/ui/` consultés : `card-stack`, `flip-words`, `colourful-text`… aucun ne correspondait à un effet typewriter mot-unique → hook custom justifié

**Erreurs rencontrées** : aucune

**Leçons retenues** :
- **Sticky + sections empilées** : la condition NON-NÉGOCIABLE est que les sections empilées soient **opaques** — sinon le sticky se voit à travers et l'effet devient un calque transparent
- **Blur sur image uniquement** : isoler le `filter: blur()` sur le `<img>` de fond (pas sur le `<section>`), sinon tout le contenu (titre, boutons) devient flou aussi
- **Typewriter mot-unique** : pas besoin de lib (`react-typist`, `typed.js`) — un hook de 25 lignes avec `setInterval` + pause + cleanup suffit. Principe "code humain" du CLAUDE.md
- **Variables CSS Tailwind 4** : les déclarer dans `@theme` les expose à la fois en CSS et utilisables via `font-family: var(--font-hero)` inline
- **Listener scroll** : toujours `{ passive: true }` (perf scroll mobile) + cleanup dans le `useEffect` return

**Skill utilisée** : aucune (refactor frontend pur)

**Fichiers produits / modifiés** :
- `src/hooks/useTypewriter.ts` (créé)
- `src/index.css` (import fonts + variables)
- `src/pages/Landing/sections/Hero.tsx` (refactor majeur)
- `src/pages/Landing/LandingPage.tsx` (Hero sticky + StackedSection)

---

### [2026-04-23] — Migration du projet vers repo dédié PlumeDM

**Contexte** : Le code du projet PLUME (landing page + structure app) était dans le repo `My_ui_components/plume/`, alors que `My_ui_components` ne doit contenir que la bibliothèque de composants UI réutilisables. Besoin de séparer en deux repos distincts.

**Ce qui a été fait** :
- Diagnostic : un repo git fantôme vide à la racine `E:/` bloquait toutes les opérations git sous `E:/Plume/` (dubious ownership)
- Suppression propre du `.git` fantôme (0 commit, 0 remote → aucune perte)
- Installation `gh` CLI via `winget install --id GitHub.cli`
- `PATH` utilisateur étendu pour exposer `graphify.exe` (`C:/Users/PC/AppData/Roaming/Python/Python312/Scripts`)
- Création repo GitHub `Cephas-67/PlumeDM` (privé) via `gh repo create`
- Copie working tree `My_ui_components/plume/` → `E:/Plume/` avec `robocopy /E /XD node_modules dist cache .git`
- `.gitignore` étendu : `My_ui_components/` (repo voisin), `graphify-out/cache/`, `.env*`
- `git init -b main` à `E:/Plume/`, commit initial (73 fichiers), push vers PlumeDM
- Nettoyage `My_ui_components` : `rm -rf plume/` + commit `fd9bd9d` + push

**Erreurs rencontrées** :
- `git status` → `fatal: detected dubious ownership in repository at 'E:/'`
  → Cause : repo git fantôme à la racine du disque + permissions Windows (owner `BUILTIN/Administrateurs`)
  → Solution : `git config --global --add safe.directory <path>` puis suppression du `.git` fantôme
- `robocopy` exit code 3 → faux-positif (codes 0-7 = succès ; 3 = "some files copied, no failure")

**Leçons retenues** :
- **Toujours inspecter avant de supprimer** un `.git` inconnu (vérifier commits, remote, branches) — même s'il a l'air fantôme
- **`safe.directory`** est la règle git à connaître sur Windows avec disque externe ou montage non-standard
- **Séparer les repos** dès qu'un sous-dossier a sa propre identité projet — évite les confusions et les pushes accidentels
- **`robocopy /XD`** pour exclure proprement `node_modules dist cache .git` lors d'une copie de projet
- **Pour les secrets** dans un repo privé (`.claude/settings.json`) : rester vigilant si passage public un jour

**Skill utilisée** : aucune (opérations shell + git + gh natives)

**Fichiers produits** :
- Nouveau repo : `https://github.com/Cephas-67/PlumeDM` (privé, branche `main`, 1 commit)
- `E:/Plume/.gitignore` étendu
- `E:/Plume/AMELIORATIONS.md` (ce fichier)

---

### [Avril 2026] — Initialisation CLAUDE.md + AMELIORATIONS.md pour PLUME

**Contexte** : Mise en place du système de mémoire persistante spécifique au projet PLUME — plateforme de littérature béninoise et africaine. Lecture complète du cahier des charges (16 pages) via rasterisation PDF.

**Ce qui a été fait** :
- Lecture du PDF `Cahier_charge.pdf` (16 pages) via `pdftoppm` — le PDF était un binaire compressé non extractible par `pdftotext`
- Extraction de toutes les informations : vision, stack, architecture, schéma BDD, routes API, système de niveaux, phases de développement, métriques
- Création de `CLAUDE.md` spécifique PLUME avec toutes les données du cahier des charges
- Création de `AMELIORATIONS.md` (ce fichier) avec les leçons initiales
- Intégration de la règle sur les composants UI personnels de Gblewa

**Erreurs rencontrées** :
- `pdftotext` retournait un fichier vide (0 lignes) → le PDF était compressé/FlateDecode
- Solution : rasteriser avec `pdftoppm -jpeg -r 150` page par page et lire visuellement

**Leçons retenues** :
- Toujours tenter `pdftotext` d'abord, puis fallback sur `pdftoppm` si vide
- Pour les PDFs produits par "Microsoft: Print To PDF", la rasterisation est souvent nécessaire
- Lire toutes les pages (ne pas s'arrêter aux premières) pour avoir le contexte complet

**Skill utilisée** : `pdf-reading`

**Fichiers produits** : `CLAUDE.md`, `AMELIORATIONS.md`

---

## 🐛 Catalogue d'Erreurs Résolues

---

### PDF — pdftotext retourne fichier vide

**Symptôme** : `wc -l output.txt` → `0 output.txt`
**Cause** : PDF compressé (FlateDecode), souvent issu de "Print to PDF"
**Solution** :
```bash
# Toujours essayer d'abord :
pdftotext -layout document.pdf output.txt

# Si vide → rasteriser :
pdftoppm -jpeg -r 150 -f 1 -l 3 document.pdf /tmp/page
ls /tmp/page*.jpg  # vérifier le nommage
# Puis view /tmp/page-01.jpg pour lecture visuelle
```
**Statut** : ✅ Pattern établi

---

### pip — Installation dans le container Ubuntu

**Erreur** : `error: externally-managed-environment`
**Solution** :
```bash
pip install <package> --break-system-packages
```
**Statut** : ✅ Pattern standard — toujours utiliser cette option

---

### pdftoppm — Nommage des fichiers de sortie

**Problème** : Le nommage dépend du nombre total de pages (padding zéro)
- PDF 16 pages → `page-01.jpg` à `page-16.jpg`
- PDF 200+ pages → `page-001.jpg` à `page-200.jpg`

**Solution** :
```bash
ls /tmp/page*.jpg  # toujours vérifier avant d'utiliser
```
**Statut** : ✅ Toujours faire `ls` avant `view`

---

## 📚 Leçons Générales Accumulées

| # | Leçon | Contexte |
|---|---|---|
| 1 | Lire SKILL.md AVANT tout code | Chaque skill a ses contraintes d'environnement spécifiques |
| 2 | `--break-system-packages` systématique pour pip | Environnement Ubuntu managé |
| 3 | Copier les fichiers finals dans `/mnt/user-data/outputs/` | Sans ça, l'utilisateur ne peut pas télécharger |
| 4 | pdftotext d'abord → pdftoppm en fallback | PDFs compressés (Print to PDF) nécessitent rasterisation |
| 5 | Lire toutes les pages d'un PDF avant de coder | Risque de manquer des infos cruciales (routes API, schéma BDD…) |
| 6 | Vérifier `src/components/ui/` avant tout composant React | Gblewa a un dossier de composants UI personnels à réutiliser en priorité |
| 7 | Mobile-first obligatoire pour PLUME | Breakpoints 375px/768px/1280px — public cible africain majoritairement mobile |
| 8 | Palette PLUME = trio Bleu (#2563EB) + Violet (#6D28D9) + Ambre (#B45309) | Identité réelle extraite de la landing — s'applique à toute l'app, pas seulement au marketing |
| 9 | JWT en httpOnly cookie — jamais localStorage | Sécurité XSS — règle non-négociable du cahier des charges |
| 10 | ORM paramétré (Prisma/Knex) — jamais SQL brut | Prévention injection SQL — règle de sécurité PLUME |
| 11 | Rate limiting sur `/auth` et `/payments` | Max 5 tentatives OTP/heure/identifiant |
| 12 | Montants toujours en FCFA (INTEGER) | Pas de float pour les montants monétaires |
| 13 | Code simple > code clever | Maintenabilité > performance prématurée |
| 14 | Sticky + sections empilées → backgrounds opaques obligatoires | Sinon le sticky se voit à travers les sections du dessus |
| 15 | `filter: blur()` doit cibler l'image de fond, pas la section | Sinon le contenu (texte, boutons) devient flou aussi |
| 16 | Listener scroll : `{ passive: true }` + cleanup systématique | Perf scroll mobile + pas de fuite mémoire |
| 17 | Tailwind 4 : déclarer fonts dans `@theme` puis `var(--font-x)` inline | Permet de mixer Tailwind tokens et styles inline custom |
| 18 | `useRef` + DOM direct pour effets scroll continus | Évite re-render à chaque pixel — bien plus fluide que `useState` |
| 19 | Bézier `C`/`Q` en SVG pour flèches doodle | Tracé "à la main" naturel, bien plus joli que `L` rectiligne |
| 20 | Toujours vérifier `src/components/ui/` AVANT de coder un effet | ColourfulText, FlipWords, etc. déjà disponibles — ne JAMAIS réinventer |
| 21 | Jamais de `translateY` initial sur un wrapper qui doit couvrir un sticky | Crée un trou pendant l'animation, révèle l'élément derrière |
| 22 | Polices critiques : `<link>` `<head>` ou `@font-face` local > `@import` CSS | Plus rapide, plus fiable, preconnect natif |
| 23 | `clamp(min, vw, max)` pour typographie responsive | Plus propre que media-queries — un seul appel CSS, fluide |
| 24 | Cohérence d'identité = mêmes composants partagés | Plume navbar/Hero partagent ColourfulText — une future palette se propage |
| 25 | Great Vibes : +30% de fontSize vs fontes standards | Police haute avec jambages, sinon paraît trop petite à surface équivalente |
| 26 | Chasse IA = texte + imports icônes (Sparkles/Bot/Wand/Brain/Cpu) | Les icônes "magiques" trahissent un badge IA même sans le texte |
| 27 | Une source de vérité pour les éléments d'identité visuelle | Logo, palette, typo critiques = un seul composant partagé. Pas de duplication entre footer et navbar. |
| 28 | Composants SVG props-driven > duplications inline | `<Icon size color>` factorisé évite 4 variantes Sm/Md/Lg/Light/Dark |
| 29 | Questionner le vocabulaire hérité de templates SaaS | "Le plus populaire" = vocabulaire d'abonnement, hors-sujet pour PLUME (niveaux acquis par engagement) |
| 30 | Style 21st.dev = monoline + Bézier + traits fins (1.5–1.6) | Plus élégant que les icônes Material/lucide industrielles |

---

## 🔧 Snippets Réutilisables PLUME

### Palette Tailwind PLUME (extension à ajouter)
```js
/* tailwind.config.js — charte réelle PLUME (extraite de la landing) */
colors: {
  plume: {
    // 🔵 Bleu — primaire (actions, CTA, Hero)
    blue:      '#2563EB',
    blueDark:  '#1D4ED8',
    blueDeep:  '#1E3A8A',
    blueRing:  '#3B82F6',
    blueTint:  '#F4F7FF',

    // 🟣 Violet — secondaire (Problem, FAQ, témoignages)
    violet:       '#6D28D9',
    violetBright: '#7C3AED',
    violetDeep:   '#5B21B6',
    violetSoft:   '#EDE9FE',
    violetDark:   '#A78BFA',

    // 🟡 Ambre — accent (Levels, BookCatalogue, features)
    amber:       '#B45309',
    amberBright: '#F59E0B',
    amberHot:    '#D97706',
    amberDeep:   '#92400E',
    amberSoft:   '#FEF3C7',

    // ⚫ Neutres
    ink:     '#1C1917',   // texte titres light
    body:    '#44403C',   // texte body light
    muted:   '#78716C',   // subtitle light
    inkDark: '#F1F5F9',   // titres dark
    bodyDark:'#94A3B8',   // body dark
    bg:      '#FFFFFF',
    bgDark:  '#0F172A',
  }
}
```

### Structure composant React PLUME (pattern standard)
```jsx
// Toujours vérifier src/components/ui/ d'abord
// Pattern d'un composant PLUME simple et maintenable

const WorkCard = ({ work, onRead }) => {
  // 1. Props claires et documentées
  // 2. Gestion des états de chargement
  // 3. Mobile-first avec Tailwind
  return (
    <div className="bg-plume-amberSoft rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* contenu */}
    </div>
  );
};

export default WorkCard;
```

### Appel API avec gestion d'erreur (pattern hooks PLUME)
```js
// hooks/useWorks.js — pattern standard
const useWorks = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorks = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.works.getAll(filters);
      setWorks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { works, loading, error, fetchWorks };
};
```

### Format montant FCFA
```js
// utils/formatCFA.js
export const formatCFA = (amount) => {
  if (!amount || amount === 0) return 'Gratuit';
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};
```

### Flux OTP — logique backend (Express)
```js
// Générer OTP : 6 chiffres, hashé, stocké Redis TTL 10min
// POST /api/v1/auth/request-otp
// body: { channel: 'phone'|'email', value: '...' }
// Retourne JWT en httpOnly cookie si verify-otp réussit
// Rate limit : 5 tentatives/heure/identifiant (via express-rate-limit)
```

### Copie vers outputs
```bash
cp /home/claude/fichier.jsx /mnt/user-data/outputs/
cp /home/claude/fichier.js  /mnt/user-data/outputs/
```

---

## 📊 Statistiques du Journal

| Métrique | Valeur |
|---|---|
| Tâches documentées | 7 |
| Erreurs résolues | 3 |
| Leçons générales | 30 |
| Snippets réutilisables | 5 |
| Sessions totales | 2 |

> *Mis à jour manuellement après chaque entrée.*

---

## 🗺️ État d'Avancement PLUME

```
Phase 1 — MVP
  [~] Landing page complète (Hero refondue 2026-04-24 — paperplane, typewriter, sticky, blur)
  [ ] Auth OTP (téléphone + email)
  [ ] Profils utilisateurs (lecteur + auteur)
  [ ] Publication œuvres + épisodes (éditeur riche)
  [ ] Lecture œuvres gratuites
  [ ] Likes, commentaires, abonnements
  [ ] Niveaux 1 & 2 (sans paiement)
  [ ] Notifications basiques

Phase 2 — Monétisation
  [ ] Mobile Money (MTN MoMo + Moov Africa)
  [ ] Portefeuille interne
  [ ] Dons (Niveau 2)
  [ ] Vente chapitres/œuvres (Niveau 3)
  [ ] Système de retraits
  [ ] Dashboard revenus auteur

Phase 3 — Croissance
  [ ] Classements hebdomadaires
  [ ] Système de badges
  [ ] Analytics avancées
  [ ] Notifications push
  [ ] Recherche avancée
  [ ] Mode hors-ligne partiel
```

> Cocher les cases au fur et à mesure des livraisons ✅

---

*Projet PLUME — Bénin, 2026 | Initialisé : Avril 2026*
