# UI-UX.md — Règles de Design Production-Grade

> Lire avant tout code d'interface. Ce fichier définit le **comment** construire,
> pas les couleurs. Les couleurs viennent du projet.

---

## 0. Le Problème à Éviter — "AI Design Slop"

Les LLMs produisent par défaut des interfaces reconnaissables entre mille.
Ce pattern doit être **activement évité** :

- Gros titre centré avec texte en dégradé
- Sous-titre gris, puis 3 cartes identiques avec icône + titre + texte
- Sections alternées fond clair / fond sombre toutes les 2 sections
- Bouton CTA `rounded-full` avec `hover:scale-105`
- Footer 4 colonnes de liens
- Glassmorphism `backdrop-blur` partout
- Particules animées en background
- Progress bars décoratifs sans sens fonctionnel

**Ce n'est pas du design. C'est un template recyclé.**

---

## 1. Références — Ce Qu'on Reproduit

### Anthropic (anthropic.com, claude.ai)
- Beaucoup d'espace blanc. Les éléments respirent.
- Typographie éditoriale — serif massif pour les grands titres
- Les accents sont rares et précis — une seule couleur vive, utilisée avec parcimonie
- Pas de cartes partout — le contenu est posé directement sur la page
- Interactions subtiles, transitions courtes (150–200ms)

### Linear (linear.app)
- Layout asymétrique — texte à gauche, visuels décalés à droite
- Typographie sans-serif resserrée — `letter-spacing` tight sur les headings
- Lignes fines comme séparateurs, pas de cartes lourdes
- Motion précise — reveals au scroll avec décalage (stagger)
- Densité d'information élevée mais hiérarchie claire

### Vercel (vercel.com)
- Grille stricte — tout s'aligne, rien ne flotte
- Contraste fort — sections sombres/claires qui se succèdent avec intention
- Typographie large et bold pour les headings, petite et précise pour le corps
- Code snippets comme éléments visuels à part entière

### Stripe (stripe.com)
- Une seule zone visuellement riche sur la page, le reste est sobre
- `font-weight` variation très précise — regular pour le corps, semibold pour les CTAs
- La couleur primaire est réservée aux éléments interactifs uniquement

### Notion (notion.so)
- Sidebar + main content — layout fonctionnel, pas décoratif
- Densité élevée dans les listes, espace généreux dans les headers
- Tables et listes comme composants principaux, pas que des cartes
- Focus sur la lisibilité longue durée

---

## 2. Typographie — Règles Précises

### Hiérarchie
```
Display (hero)   : font-display (serif), clamp(2.5rem, 6vw, 5rem), weight 700
H1 (page title)  : font-display ou font-body bold, 2rem–2.5rem, weight 600–700
H2 (section)     : font-body, 1.25rem–1.5rem, weight 600
H3 (card title)  : font-body, 1rem–1.125rem, weight 600
Body             : font-body, 1rem, weight 400
Small / meta     : font-body, 0.75rem–0.875rem, weight 400–500
```

### Règles obligatoires
- `line-height` des titres : **1.05 à 1.2** — jamais 1.5 sur un H1
- `letter-spacing` des grands titres : **-0.02em à -0.04em** (optically correct)
- Titres display en **serif** — crée immédiatement une identité éditoriale
- Corps du texte en **sans-serif** — lisibilité optimale

### Interdit
- ❌ Texte en dégradé (`background-clip: text`) — cliché épuisé
- ❌ `text-transform: uppercase` sur les titres principaux
- ❌ `font-weight: 700` sur tout — réserver aux headings importants
- ❌ Emoji dans les titres de section
- ❌ Plusieurs niveaux de dégradé typographique sur la même page

---

## 3. Layout — Principes de Composition

### Respiration
- Sections : `padding-block` minimum **4rem** (6–8rem sur desktop)
- Contenu max-width : `1152px` ou `1280px` avec `margin: auto`
- Padding de page : `padding-inline: 1.5rem` (mobile), `2rem–3rem` (desktop)

### Asymétrie intentionnelle
- Éviter les layouts 100% symétriques — décaler un élément crée du dynamisme
- Hero : texte peut occuper 60% de la largeur, laisser le reste respirer
- Ne pas centrer tous les blocs — alterner alignement gauche / centré avec intention

### Grille
- Travailler sur une grille 12 colonnes explicite
- Jamais de `width: 33.33%` sur 3 éléments identiques en dehors d'une grille déclarée
- Les colonnes doivent avoir des `gap` cohérents : `1rem`, `1.5rem`, `2rem`

### Patterns de layout par type de page
```
Landing     : hero pleine hauteur, sections larges, rythme vertical fort
Feed        : sidebar 240–280px + grille 2–4 cols selon breakpoint
Dashboard   : sidebar + main, métriques en haut, contenu dense en bas
Reader      : colonne centrale max 680px, aucune distraction latérale
Profil      : header large + grille d'œuvres en dessous
Auth        : centré, une seule colonne, max 400px, pas d'ornement
```

---

## 4. Composants — Règles de Construction

### Boutons
```
Primaire   : background couleur forte, texte contrasté, padding 10px 20px, radius 6px
Secondaire : transparent, border 1px, texte couleur secondaire
Ghost      : sans bg ni border, texte avec underline offset au hover uniquement
Destructif : couleur d'alerte, même structure que primaire
Taille     : sm (8px 14px), md (10px 20px), lg (12px 28px)
```

**Interdit sur les boutons :**
- ❌ `border-radius: 9999px` sur les CTAs principaux (réservé aux pills/tags)
- ❌ `transform: scale(1.05)` au hover — cheap
- ❌ `box-shadow` colorée (`shadow-blue-500`) — agressif
- ❌ Icônes animées au hover sur un CTA

### Cartes
```
Structure  : surface (légèrement différente du bg), border 1px, radius 8px
Padding    : 1rem–1.5rem
Hover      : changer border-color uniquement — pas de scale, pas de shadow dramatique
Shadow     : au max box-shadow 0 2px 8px rgba(0,0,0,0.08) — jamais colorée
```

**Interdit sur les cartes :**
- ❌ `hover:scale-105`
- ❌ `backdrop-blur` comme fond de carte
- ❌ Border-radius > 16px sur les cartes de contenu
- ❌ Gradient en background de carte

### Inputs / Formulaires
```
Label      : au-dessus du champ, toujours visible (jamais placeholder seul)
Border     : 1px solid var(--color-border)
Focus      : changer border-color + outline 2px offset 2px (couleur accent)
Padding    : 10px 14px
Radius     : 4px–6px
Error      : border rouge + message texte en dessous (jamais dans un toast seul)
```

### Navigation
```
Hauteur    : 56px max — jamais une navbar de 80px+
Position   : sticky top-0
Background : couleur de fond du projet + border-bottom 1px
Logo       : typographique de préférence — pas d'icône seule
Links      : font-size 0.875rem, couleur secondaire, hover couleur principale
CTA nav    : petit, compact — même hauteur que les links
Mobile     : hamburger après 768px, menu slide ou drawer
```

### Badges / Tags
```
Padding    : 2px 10px
Radius     : 9999px (pills — c'est le seul endroit où c'est approprié)
Taille     : 0.75rem, weight 500
Structure  : border 1px + dot coloré + label OU background léger + label
```

---

## 5. Interactions et Animations

### Principe de retenue
Une bonne animation est celle qu'on ne remarque pas consciemment.
Elle guide l'attention, elle ne la détourne pas.

### Ce qui est permis
```css
/* Reveal au scroll — discret */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 400ms ease, transform 400ms ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger sur les listes */
.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 50ms; }
.item:nth-child(3) { transition-delay: 100ms; }
.item:nth-child(4) { transition-delay: 150ms; }

/* Hover discret */
.card { transition: border-color 150ms ease; }
.card:hover { border-color: var(--color-muted); }

/* Transition de page */
.page-enter { opacity: 0; transform: translateY(8px); }
.page-enter-active { opacity: 1; transform: translateY(0); transition: 200ms ease; }
```

### Durées recommandées
```
Micro-interactions (hover, focus) : 100–150ms
Transitions d'état (show/hide)    : 150–250ms
Reveals au scroll                 : 300–500ms
Transitions de page               : 200–300ms
```

### Interdit
- ❌ `animation-duration > 1s` sur un élément de UI
- ❌ `animate-bounce` sur du décoratif
- ❌ Parallax sur le background d'une section
- ❌ Rotation infinie décorative
- ❌ Particules, confettis, éléments flottants en background
- ❌ `transition: all` — cibler les propriétés précises

---

## 6. Spacing — Système Cohérent

Utiliser une échelle de 4px. Pas de valeurs arbitraires.

```
4px   → gap entre éléments inline (icône + texte)
8px   → padding interne petit, gap entre elements proches
12px  → padding input, gap entre éléments liés
16px  → padding card, gap standard
24px  → padding section interne, gap entre cards
32px  → margin entre composants
48px  → padding section petite
64px  → padding section standard
96px  → padding section grande (desktop uniquement)
```

**Règle** : ne jamais utiliser `margin: 7px` ou `padding: 13px` — rester sur la grille de 4.

---

## 7. Mobile-First — Impératif

Tout composant doit être pensé mobile d'abord.

```
375px  : layout 1 colonne, texte 16px min, touch targets 44px min
768px  : 2 colonnes possibles, sidebar peut apparaître
1024px : layout complet, sidebar fixe
1280px : max-width du contenu atteint, marges latérales augmentent
```

**Règles mobile :**
- Touch target minimum : `44px × 44px` sur les éléments cliquables
- Pas de `hover` comme seule affordance — penser au tactile
- `font-size: 16px` minimum sur les inputs (évite le zoom iOS)
- Pas de contenu important dans des `overflow: hidden` qui coupe sur mobile

---

## 8. Accessibilité — Non-Négociable

```
Contraste texte/fond : minimum 4.5:1 (WCAG AA)
Focus visible        : outline visible sur TOUS les éléments interactifs
Alt text             : sur toutes les images qui ont du sens
ARIA labels          : sur les icônes seules, les boutons sans texte
Sémantique HTML      : <nav>, <main>, <article>, <section> — pas que des <div>
```

---

## 9. Composants UI Personnels — Règle de Priorité

**Avant de créer n'importe quel composant :**

1. Vérifier `src/components/ui/` dans le projet
2. Si le composant existe → l'utiliser tel quel ou l'adapter minimalement
3. Si inexistant → créer en respectant les patterns de ce fichier
4. Ne jamais réinventer ce qui existe déjà dans le dossier `ui/`

---

## 10. Checklist Avant Livraison

Cocher mentalement avant de soumettre tout code d'interface :

**Typographie**
- [ ] Grands titres en serif (font-display) ?
- [ ] `line-height` des titres ≤ 1.2 ?
- [ ] `letter-spacing` négatif sur les titres display ?
- [ ] Aucun texte en dégradé ?

**Layout**
- [ ] Sections respirent (padding-block ≥ 4rem) ?
- [ ] Pas de 3 cartes identiques en ligne avec icône+titre+texte ?
- [ ] Max-width respecté avec margin auto ?
- [ ] Testé mentalement en 375px ?

**Composants**
- [ ] Boutons avec radius 6px (pas rounded-full sur les CTAs) ?
- [ ] Pas de `hover:scale` ?
- [ ] Shadows subtiles uniquement ?
- [ ] Pas de glassmorphism décoratif ?
- [ ] Aucune couleur hardcodée (tout en var(--)) ?

**Composants UI personnels**
- [ ] `src/components/ui/` vérifié avant de créer ?

**Accessibilité**
- [ ] Touch targets ≥ 44px sur mobile ?
- [ ] Focus visible sur tous les éléments interactifs ?
- [ ] HTML sémantique (nav, main, article, section) ?

---

*UI-UX.md — Règles de craft agnostiques des couleurs*
*Les couleurs viennent du projet. Ces règles s'appliquent partout.*
