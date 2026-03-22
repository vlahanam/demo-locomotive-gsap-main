---
description: Search UI/UX design database for styles, colors, fonts, and best practices
argument-hint: [search-query]
---

**Activate the `ui-ux-pro-max` skill** to search the design intelligence database.

## Task

Search the UI/UX design database for: <query>$ARGUMENTS</query>

## Workflow

1. **Analyze the search query** to understand what the user is looking for:
   - Product type (SaaS, e-commerce, portfolio, dashboard, etc.)
   - Style keywords (minimal, glassmorphism, dark mode, etc.)
   - Industry (healthcare, fintech, gaming, etc.)
   - Stack preference (or default to `html-tailwind`)

2. **Search relevant domains** using the search script multiple times:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**Recommended search order:**
- `product` - Get style recommendations for product type
- `style` - Get detailed style guide (colors, effects, frameworks)
- `typography` - Get font pairings with Google Fonts imports
- `color` - Get color palette (Primary, Secondary, CTA, Background, Text, Border)
- `landing` - Get page structure (if landing page)
- `chart` - Get chart recommendations (if dashboard/analytics)
- `ux` - Get best practices and anti-patterns
- `stack` - Get stack-specific guidelines (default: html-tailwind)

3. **Synthesize results** and present findings to user in a clear, organized format.

4. **Provide actionable recommendations** based on search results.

## Available Domains

- `product` - Product type recommendations (SaaS, e-commerce, portfolio, healthcare, beauty, service)
- `style` - UI styles, colors, effects (glassmorphism, minimalism, dark mode, brutalism)
- `typography` - Font pairings, Google Fonts (elegant, playful, professional, modern)
- `color` - Color palettes by product type (saas, ecommerce, healthcare, beauty, fintech, service)
- `landing` - Page structure, CTA strategies (hero, hero-centric, testimonial, pricing, social-proof)
- `chart` - Chart types, library recommendations (trend, comparison, timeline, funnel, pie)
- `ux` - Best practices, anti-patterns (animation, accessibility, z-index, loading)

## Available Stacks

- `html-tailwind` (DEFAULT) - Tailwind utilities, responsive, accessibility
- `react` - State, hooks, performance, patterns
- `nextjs` - SSR, routing, images, API routes
- `vue` - Composition API, Pinia, Vue Router
- `svelte` - Runes, stores, SvelteKit
- `swiftui` - Views, State, Navigation, Animation
- `react-native` - Components, Navigation, Lists
- `flutter` - Widgets, State, Layout, Theming

## Example Searches

```bash
# Search for SaaS dashboard styles
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "saas dashboard professional" --domain product

# Search for glassmorphism style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism modern" --domain style

# Search for elegant font pairings
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant luxury" --domain typography

# Search for healthcare color palettes
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "healthcare medical" --domain color

# Search for animation best practices
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation" --domain ux

# Search for React best practices
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "state hooks performance" --stack react
```

## Notes

- Be specific with keywords for better results
- Search multiple domains to get comprehensive design system
- Always check UX domain for best practices and common issues
- Default to `html-tailwind` stack if user doesn't specify
- Present results in clear, actionable format
