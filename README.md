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

```bash
npm install
npm run format
npm run lint
npm run typecheck
npm run test
```

### ML CI/CD/CT workflow

This repository now includes `.github/workflows/ml-cicd.yml`, which defines a
GitHub Actions pipeline for ML operations with:

- data validation gates before training,
- reproducible training metadata + MLflow logging,
- drift detection checks that can fail builds,
- Kubeflow pipeline compilation/submission, and
- automated MLflow model-registry promotion on `main`.

Expected project entrypoints for this workflow live under `ml/`:

- `ml/data_validation/run_validation.py`
- `ml/training/train.py`
- `ml/monitoring/drift_check.py`
- `ml/pipelines/training_pipeline.py`
- `ml/pipelines/submit_pipeline_run.py`
