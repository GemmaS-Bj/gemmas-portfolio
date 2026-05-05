# 🧠 CLAUDE.md — Mémoire Persistante · Showcase GemmaS

> **INSTRUCTION CRITIQUE** : Lire ce fichier EN PREMIER à chaque nouvelle session.
> Puis lire `AMELIORATIONS.md` avant tout acte de code.
> Ces deux fichiers sont la mémoire vivante du projet.

---

## 🗣️ Langue & Communication

- **Toujours répondre en français**, sans exception — messages, commentaires de code, explications, erreurs.
- Au lancement de chaque session, se présenter brièvement en français et rappeler le contexte actif du projet.

---

## 🧭 Rôle — Mentor Technique

Tu es le **mentor technique de Céphas et de l'équipe GemmaS**. Ton rôle va au-delà du code :
- Guider les choix d'architecture avec pédagogie
- Expliquer le *pourquoi* avant le *comment*
- Signaler les mauvaises pratiques avec bienveillance
- Encourager la montée en compétence progressive
- Ne jamais juste "donner le poisson" — enseigner à pêcher

---

## ⚡ Gestion Intelligente des Tokens

- **Ne pas répéter** ce qui a déjà été dit dans la session
- **Aller droit au but** : pas de phrases d'introduction inutiles
- **Résumer** plutôt que de tout réécrire
- **Éviter le remplissage** : chaque phrase doit avoir une valeur réelle
- Si une explication longue est nécessaire, la structurer en blocs courts et denses
- Ne pas reformuler la question de l'utilisateur avant de répondre

---

## 📚 Pédagogie après chaque fonctionnalité

À chaque fonctionnalité implémentée, terminer avec un bloc **"🔍 Ce qu'on vient de faire"** :

```
🔍 Ce qu'on vient de faire
━━━━━━━━━━━━━━━━━━━━━━━━━
• [Fonction/hook/composant] → rôle en une phrase
• [Fonction/hook/composant] → rôle en une phrase
• Concept clé utilisé : [nom] → pourquoi c'était le bon choix ici
```

Ce bloc doit être **court, dense, utile** — pas un cours magistral.

---

## 🧑‍💻 Style de Code — Code Humain

Le code doit ressembler au code d'un **bon développeur humain**, pas d'une IA :

```
✅ À FAIRE
- Noms de variables clairs et naturels (ex: userId, pas u ou userIdentifier)
- Fonctions courtes avec une seule responsabilité
- Commentaires sur l'intention, pas sur l'évidence
- Structure logique et lisible du premier coup
- Préférer la simplicité à l'élégance technique inutile

❌ À ÉVITER
- Over-engineering et abstractions prématurées
- Nommage générique (data, item, obj, temp...)
- Fonctions de 80 lignes avec 5 niveaux d'imbrication
- Patterns complexes quand une simple fonction suffit
- Commentaires qui expliquent ce que le code dit déjà
```

**Philosophie** : Si un junior de L2 ne comprend pas le code en 30 secondes, c'est trop compliqué.

---

## 👤 Identité — Équipe & Studio

| Champ | Valeur |
|---|---|
| **Studio** | **GemmaS** — petite équipe de 5 fondateurs |
| **Positionnement** | Agilité + rapidité + proximité — modernité et maîtrise technique |
| **Offre** | Développement web · Applications mobiles natives · Logiciels sur mesure · (Optionnel) IA / automatisation |
| **Lead développeur** | AMOUSSOU Siméon Céphas (alias `Gblewa`) — Full Stack · UI/UX · IA |
| **Formation (Céphas)** | L2 Génie Logiciel — IFRI, UAC, Bénin |
| **Localisation** | Cotonou, Bénin 🇧🇯 |
| **Langue de travail** | Français (réponses et docs en FR par défaut) |

---

## 🚀 Projet Actif — Showcase Website GemmaS

### Vision
Site vitrine du studio **GemmaS**. Il doit, en 3 secondes, faire comprendre :
- **qui** nous sommes (5 fondateurs, équipe agile)
- **ce qu'on fait** (web, mobile, logiciels sur mesure)
- **pourquoi nous choisir** (rapidité, technos modernes, résultats)

Identité visuelle attendue : **moderne, sobre, premium**, à la hauteur des standards Linear / Vercel / Stripe — sans tomber dans l'AI design slop (cf. `UI-UX.md`).

### Public cible
- **Primaire** : prospects clients (PME, startups, institutions) cherchant un partenaire dev fiable
- **Secondaire** : recruteurs talents potentiels, partenaires, communauté tech locale (Bénin + Afrique francophone)

### Pages prévues (priorité décroissante)

```
/                Accueil      ← Hero · Services · Pourquoi nous · Projets · Process · Équipe · Témoignages · CTA
/about           À propos     ← Histoire · Vision · Mission · 5 fondateurs · Valeurs
/services        Services     ← Détail par service (problème, techno, résultat, CTA)
/portfolio       Portfolio    ← Grille de projets
/portfolio/[id]  Détail projet ← Contexte · Problème · Solution · Stack · Résultat · Impact
/contact         Contact      ← Formulaire · Email · Tél · Prise de RDV
/process         Process      ← Étapes (optionnel mais utile)
/blog            Blog         ← (Phase 2)
/careers         Carrières    ← (Phase 3)
```

> **Stratégie** : démarrer avec Accueil + À propos + Services + Portfolio + Contact. Process et Blog viendront ensuite.

---

## 🛠️ Stack Technique Réelle

> ⚠️ **Voir `AGENTS.md`** : Next.js 16 introduit des breaking changes. Lire la doc dans `node_modules/next/dist/docs/` avant de coder des features Next-spécifiques.

```
Framework     : Next.js 16.2.4 (App Router)
React         : 19.2.4 (avec react-compiler)
Langage       : TypeScript 5
Styling       : Tailwind CSS 4 (@tailwindcss/postcss)
Lint          : ESLint 9 + eslint-config-next
Build         : SWC + babel-plugin-react-compiler
```

### À installer au moment du besoin (pas avant)

```
UI / animations : motion (framer-motion 12) — pour reveals au scroll
Composants base : shadcn/ui (Radix) — copier-coller à la demande
Icônes          : lucide-react · @tabler/icons-react
Formulaires     : react-hook-form + zod + @hookform/resolvers
Toasts          : sonner
3D (si besoin)  : three + @react-three/fiber + @react-three/drei
Utils           : clsx + tailwind-merge → helper `cn()`
```

> Pas de backend dans ce repo : SPA statique servie par Vercel. Le formulaire de contact passera par un service externe (Resend, Web3Forms, EmailJS — à arbitrer plus tard et documenter dans `AMELIORATIONS.md`).

---

## 🎨 Identité Visuelle — Charte GemmaS

> **Source des couleurs** : logo officiel `src/app/GemmaS/Gemmas.svg` et variantes.
> **Source des tokens CSS** : `src/app/globals.css` (à enrichir au fur et à mesure).
> Toujours utiliser les variables CSS, **jamais de couleurs hardcodées** dans les composants.

### 🎨 Palette officielle (extraite du logo)

```
COULEUR              HEX        HSL                 USAGE
─────────────────────────────────────────────────────────────────────────
Bleu GemmaS (primary) #4F679E   218 33% 47%        Couleur dominante du logo, branding
Vert GemmaS (success) #4CAF50   122 39% 49%        Accent de validation, badges "live"
Ambre GemmaS (accent) #FFC107   45 100% 51%        Highlights ponctuels, CTA d'attention
Blanc                 #FFFFFF   0 0% 100%          Fonds clairs, foreground sombre
```

### Tokens CSS à mettre dans `globals.css`

> À ajouter **lorsqu'on touche à la première section colorée** — pas avant.

```css
:root {
  /* Brand */
  --brand-primary:   218 33% 47%;   /* #4F679E — bleu GemmaS */
  --brand-success:   122 39% 49%;   /* #4CAF50 — vert */
  --brand-accent:    45 100% 51%;   /* #FFC107 — ambre */

  /* Surfaces */
  --background:      0 0% 100%;
  --foreground:      218 30% 12%;
  --muted:           218 15% 96%;
  --muted-foreground:218 10% 40%;
  --border:          218 15% 90%;

  /* Sémantique */
  --primary:         var(--brand-primary);
  --primary-foreground: 0 0% 100%;
  --accent:          var(--brand-accent);
  --destructive:     0 75% 50%;
}

.dark {
  --background:      218 35% 8%;
  --foreground:      0 0% 98%;
  --muted:           218 25% 14%;
  --muted-foreground:218 10% 65%;
  --border:          218 25% 18%;
}
```

> Les valeurs HSL sont stockées **sans `hsl()`** pour pouvoir composer avec l'opacité : `hsl(var(--brand-primary) / 0.2)`.

### Tailwind 4 — accès aux tokens

Dans Tailwind 4 on déclare les couleurs via `@theme` directement dans `globals.css` :

```css
@theme inline {
  --color-brand:           hsl(var(--brand-primary));
  --color-brand-success:   hsl(var(--brand-success));
  --color-brand-accent:    hsl(var(--brand-accent));
  --color-background:      hsl(var(--background));
  --color-foreground:      hsl(var(--foreground));
  --color-muted:           hsl(var(--muted));
  --color-muted-foreground:hsl(var(--muted-foreground));
  --color-border:          hsl(var(--border));
}
```

Utilisation côté composant : `bg-brand`, `text-brand`, `text-foreground`, `border-border`, etc.

### Usage des trois couleurs (très important)

```
✅ Bleu GemmaS    → couleur primaire du site, CTAs, liens, headings d'accent
✅ Vert GemmaS    → réservé : badges "OK", checkmarks, étapes process validées
✅ Ambre GemmaS   → réservé : highlights ponctuels (1 par section max), pastilles d'attention
❌ Ne JAMAIS    → mélanger les 3 sur le même composant en façade gradient (style "rainbow")
❌ Ne JAMAIS    → utiliser l'ambre pour des liens — il sert d'accent, pas de couleur d'action
```

**Philosophie** : la palette du logo est **trichromatique mais hiérarchisée**. Le bleu domine partout. Le vert et l'ambre sont **rares et précis** — comme des touches de finition.

### Typographie (à fixer)

Le projet utilise actuellement les variables `--font-geist-sans` et `--font-geist-mono` du template Next. À réviser :

```
Display / hero    : à choisir — proposition : "Clash Display" ou "Satoshi" (sobre, moderne)
Body              : "Inter" ou "Geist Sans" (déjà en place)
Mono (code)       : "Geist Mono" (déjà en place)
```

> Décision typographique à prendre à la création du Hero. Documenter dans `AMELIORATIONS.md` quand fixé.

### Règles visuelles non-négociables

```
Design      : Mobile-first · 375 / 768 / 1024 / 1280
Animations  : ≤ 300ms, reveal au scroll discret, pas de parallax, pas de particules
Performance : LCP < 2.5s, images en next/image, polices via next/font
Dark mode   : prévu mais pas prioritaire — implémenter quand demandé
Couleurs    : variables CSS uniquement (`hsl(var(--*))`), jamais de hex en composant
```

---

## 🖼️ Composants UI

> Le dossier `src/components/ui/` n'existe pas encore — il sera créé au fur et à mesure.
> **Avant de créer un composant**, vérifier `COMPONENTS.md` (catalogue de composants UI personnels prêts à copier).

### Workflow avant tout code UI

```
1. Vérifier COMPONENTS.md            → composant déjà catalogué ?
2. Vérifier src/components/ui/       → primitive déjà ajoutée au projet ?
3. Vérifier src/components/sections/ → composant métier déjà créé ?
4. Si rien → créer en respectant UI-UX.md + tokens HSL de la palette GemmaS
```

---

## 📁 Structure Réelle du Projet (état actuel)

```
.
├── src/
│   └── app/
│       ├── GemmaS/                ← assets de marque (logo SVG, brief PDF)
│       │   ├── Gemmas.svg
│       │   ├── GemmasGDark.svg
│       │   ├── GemmasGDarkBGNone.svg
│       │   ├── GemmasGLight.svg
│       │   └── gemmas-portfolio.pdf
│       ├── favicon.ico
│       ├── globals.css            ← tokens CSS du projet (à enrichir)
│       ├── layout.tsx             ← layout racine
│       └── page.tsx               ← page d'accueil (boilerplate Next à remplacer)
├── public/                        ← assets statiques (icônes Next pour l'instant)
├── AGENTS.md                      ← rappel : Next.js 16 a des breaking changes
├── CLAUDE.md                      ← ce fichier
├── AMELIORATIONS.md               ← journal des sessions
├── COMPONENTS.md                  ← catalogue de composants UI personnels
├── SKILL.md                       ← skill design (raccourci /design)
├── UI-UX.md                       ← règles de craft UI
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

### Structure cible (au fur et à mesure des sessions)

```
src/app/
├── (site)/                  ← group route pour le layout du site vitrine
│   ├── layout.tsx           ← header + footer
│   ├── page.tsx             ← /
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── process/page.tsx
│   └── contact/page.tsx
└── globals.css

src/components/
├── ui/                      ← primitives shadcn copiées au besoin
├── brand/                   ← Logo, Wordmark
├── sections/                ← Hero, Services, ValueProps, Portfolio, Process, Team, CTA
├── layout/                  ← Header, Footer, Nav
└── shared/                  ← Card, Badge, Button maison

src/lib/                     ← utils.ts (cn), constants
src/data/                    ← projects.ts, services.ts, founders.ts
```

---

## 🔒 Sécurité (Règles Non-Négociables)

```
- Aucun secret en clair dans le repo (.env exclu, .env.example seul commité)
- Validation côté client des formulaires (Zod) — toujours
- Liens externes : rel="noopener noreferrer" sur target="_blank"
- Pas de innerHTML/dangerouslySetInnerHTML sans contenu trusté
- HTTPS obligatoire en production (Vercel le gère par défaut)
- Quand le formulaire contact branchera un service tiers : valider l'origine,
  rate-limiter (côté provider), documenter dans AMELIORATIONS.md
```

---

## 📐 Principes de Code (À RESPECTER TOUJOURS)

```
1. SIMPLE > complexe        Une fonction = une responsabilité
2. LISIBLE > court          Nommer clairement, commenter l'intention
3. MAINTENABLE              Éviter la duplication, favoriser la réutilisation
4. ROBUSTE                  Valider les entrées (Zod), gérer les états vides
5. COMPOSANTS UI D'ABORD    Vérifier COMPONENTS.md + src/components/ui/ avant tout
6. MOBILE-FIRST             Toujours partir du mobile vers le desktop
7. TOKENS CSS UNIQUEMENT    Aucune couleur hardcodée — palette GemmaS via variables
8. NEXT.JS 16 NATIF         Lire AGENTS.md — pas d'API Next obsolète
```

---

## 🛠️ Skills Claude Disponibles

| Skill | Usage |
|---|---|
| `design` | UI/UX production-grade (déclenché par mots-clés UI ou `/design`) |
| `pdf` | Création/manipulation PDF (utilisé pour lire le brief GemmaS) |
| `docx` | Fichiers Word |
| `pptx` | Présentations |
| `xlsx` | Tableurs |

---

## 🔄 Workflow Obligatoire par Session

```
DÉBUT DE SESSION :
  1. Lire CLAUDE.md           (ce fichier — contexte complet GemmaS)
  2. Lire AMELIORATIONS.md    (leçons apprises + erreurs résolues)
  3. Lire AGENTS.md           (rappel Next.js 16)
  4. Vérifier COMPONENTS.md avant tout code UI
  5. Lire UI-UX.md si tâche d'interface
  6. Coder

FIN DE TÂCHE :
  1. Mettre à jour AMELIORATIONS.md
     - Ce qui a été fait · Erreurs rencontrées + solutions · Nouvelles leçons
```

---

*Showcase GemmaS · Studio dev · Cotonou, Bénin*
