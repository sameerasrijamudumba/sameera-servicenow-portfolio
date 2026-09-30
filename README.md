# Sameera Srija — ServiceNow Developer Portfolio

Phases 1–4 are implemented: the visual system, sticky responsive navigation, hero,
original workflow illustration, recruiter highlights, About preview, Technical Expertise,
Professional Experience, capability journey, Development Approach, and four
featured projects with dedicated case-study pages.
Code Lab, Certifications, Education, Contact, and the final production polish are implemented. Deployment remains intentionally manual.
See `DESIGN_SYSTEM.md` for visual and interaction conventions.

## Requirements and local preview

Use Node.js 24 LTS and a current npm. The project's minimum Node version is
22.13.0; the pre-existing Node 14 installation on this computer is too old.

```powershell
cd D:\sameera-servicenow-portfolio
npm ci
npm run dev
```

Open http://localhost:3000. Stop the server with Ctrl+C.

On this computer, a modern Node runtime and a project-local npm are also available.
To use these without changing the system Node installation, run this once in the
current PowerShell terminal before the npm commands above:

```powershell
$env:PATH = 'D:\sameera-servicenow-portfolio\.tools;C:\Users\prana\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
npm.cmd run dev
```

The `.tools` directory is a local workaround and is not part of the application.
On another machine, install Node 24 LTS with npm instead.
Use `npm.cmd` instead of `npm` if PowerShell blocks npm's script wrapper.

## Checks and production preview

```powershell
npm run check
npm run build
npm run start
```

`check` runs ESLint (zero warnings) and Next.js route type generation followed by
TypeScript. Production preview is available at http://localhost:3000. Stop the
development server before starting production on the same port.

## Architecture

- `src/app`: App Router, base layout, homepage, global styles, and SVG icon.
- `src/components/layout`: sticky Navbar and nonmodal mobile disclosure menu.
- `src/components/sections`: Hero, Highlights, About, Skills, Experience, Journey, DevelopmentApproach, and Projects.
- `src/components/visuals`: original HTML/SVG HeroWorkflow concept.
- `src/components/ui`: shared Container, Reveal, and ResumeButton.
- `src/components/projects`: alternating ProjectPreview and shared CaseStudy page renderer.
- `src/data`: centralized, typed content based on `PORTFOLIO_SPEC.md`.
- `src/data/placeholders`: unpublished example responsibilities, project outlines,
  certification names, and a demonstration snippet; no page imports these files.
- `src/types/portfolio.ts`: content contracts and explicit content status types.
- `src/lib`: reserved for shared utilities.
- `public/images` and `public/resume`: empty asset directories, retained by `.gitkeep`.

Core stack: Next.js App Router, React, TypeScript, Tailwind CSS, Motion for React
(the current Framer Motion successor), and Lucide React. Animation and icons are
used for viewport reveals and interface icons. Tailwind uses
the PostCSS integration and CSS-based configuration in `globals.css`.

## Content rules

The root `PORTFOLIO_SPEC.md` is the source of truth. Profile copy and skill lists
come from that specification; supplied content is not independently verified.
Contact fields are centralized, project scenarios retain internal source metadata, and
the certification export filters for verified records only (currently none).
No dates, contact details, certifications, or numerical outcomes were invented.

Do not import placeholder modules into pages or components; ESLint enforces this
boundary for direct imports. Confirm factual accuracy before promoting draft
records. Do not render null fields, missing resume links, or planned navigation
anchors before their sections exist. Unavailable navbar items and hero CTAs are
disabled and labeled as upcoming; the visible resume button is disabled until
the PDF is supplied. Home, About, Skills, Experience, and Projects navigation work.
The hero Experience CTA links to the implemented experience section. Do not add private client data.

When supplied, place the actual resume in `public/resume/` and set `resumePath`
in `src/data/contact.ts`. Its example filename in the specification is not an
existing asset. Domain-dependent SEO and Open Graph work belongs to a later phase.

Phase 6 is complete. The supplied resume is now the factual source for the personalized profile, skills, experience, education, CSA certification, and contact details. Deployment remains outside the approved scope.

## Phase 3 content verification

The user authorized preview rendering of the example skills, responsibilities,
and capability journey in the Phase 3 brief. Their typed data records in
`skills.ts`, `experience.ts`, and `journey.ts` explicitly retain
`verification: "pending"`. Per the Phase 4 instruction, these statuses are not rendered publicly.
They are not certified facts. Confirm each capability and responsibility before
publication, especially IntegrationHub, ACL work, REST integrations, and enterprise
solution scope. Employment dates remain null. The journey is thematic, not dated.
Original draft material under `data/placeholders` remains unpublished.

## Phase 4 case studies

Case-study content is centralized in `src/data/projects.ts` and `src/data/project-details.ts`. Four routes under
`/projects/[slug]` are generated statically, with metadata and unavailable-slug
404 handling. Each case study identifies itself as a portfolio solution scenario;
implementation steps are proposed approaches, and outcomes are qualitative
design goals rather than measured client results. Verify project experience and
implementation details before presenting these as delivered professional work.
No client data, credentials, private URLs, or employer code is used.

## Phase 6 personalization

The supplied resume is copied to `public/resume/Sameera-Srija-ServiceNow-Developer.pdf`
and connected to every resume CTA. The public profile uses the verified name,
Cognizant role and dates, technical skills, education, CSA certification, and
Hyderabad contact details from that document. GitHub remains omitted because no
profile was supplied. The four existing case studies remain portfolio scenarios
and were not replaced with the resume's additional project experience.

Project previews alternate content and diagrams on desktop and stack in reading
order on mobile. The shared diagram uses real text and HTML, not scaled images.
Projects, Experience, Code Lab, Education, Certification, Contact, and Resume CTAs are active.


## Phase 5 Code Lab

Six synthetic examples live in `src/data/code-samples.ts`, rendered by the
CodeLab section and CodeLabExplorer client component. The interface provides
keyboard tabs (Left/Right, Home/End), touch interaction, display-only highlighting,
copy feedback, and internally scrollable code. No dependencies were added.
The portfolio never executes ServiceNow snippets or makes ServiceNow requests.

The lookup schema is illustrative and must be created before use. Business Rule
and Script Include examples assume the same application scope. GlideAjax needs a
client-callable Script Include with appropriate access configuration. Choice values
and permissions must be checked in a target instance. Examples were not executed
against a ServiceNow instance.

## Production and deployment

Run locally with:

```bash
npm install
npm run dev
```

Validate a production build with:

```bash
npm run build
npm start
```

To deploy with Vercel, import this repository into Vercel, keep the detected
Next.js build settings, and deploy after the local build passes. Before launch,
set `siteUrl` in `src/data/site.ts` to the final HTTPS domain. That enables the
canonical URL, sitemap, absolute Open Graph/Twitter image metadata, and sitemap
robots reference. No deployment or domain was configured in this phase.
