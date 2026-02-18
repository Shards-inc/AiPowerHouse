<div align="center">
  <img
    width="1200"
    height="475"
    alt="GHBanner"
    src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"
  />
  <h1>Built with AI Studio</h1>
  <p>The fastest path from prompt to production with Gemini.</p>
  <a href="https://aistudio.google.com/apps">Start building</a>
</div>

## AiPowerHouse UI

A polished UI shell for orchestrating multi-model AI workflows. The interface highlights
routing playbooks, governance controls, and a curated roster of leading AI platforms.

### Highlights

- Search the model roster instantly by provider name.
- Cycle a capability filter to focus on model specialties.
- View live result counts and an empty-state hint when no model matches.

### Getting started

Open `index.html` in a browser, or use a simple web server:

```bash
python3 -m http.server 5173
```

### Validation

Run the standard checks before committing changes:

- Runtime interaction assertions for roster filtering are included in `npm run test`.
- Script-block parsing uses a shared helper so tests remain stable if inline scripts are split across multiple tags.

```bash
npm install
npm run format
npm run lint
npm run typecheck
npm run test
```
