# E-commerce App (Sample for Jenkins Practice)

A tiny full-stack project to practice Jenkins multi-agent pipelines, Docker and Kubernetes.

## Structure
- `backend/`: Node.js Express API (GET /api/products, GET /healthz)
- `frontend/`: React + Vite static site consuming the API
- `k8s/`: Minimal deployments and services
- `Jenkinsfile`: Multi-agent pipeline
- `.gitlab-ci.yml`: Optional GitLab CI sample

## Quick Start (local)
```bash
# backend
cd backend
npm ci
npm start   # listens on :5000

# frontend (separate terminal)
cd ../frontend
npm ci
npm run dev # opens Vite dev server; proxies /api to :5000
```

## Docker
```bash
docker build -t backend:local backend/
docker run -p 5000:5000 backend:local

docker build -t frontend:local frontend/
docker run -p 8080:80 frontend:local
```

## Kubernetes (demo)
Update images in `k8s/*` to your registry or run a local registry/mirror.
```bash
kubectl create ns staging || true
kubectl apply -f k8s/backend-deployment.yaml -n staging
kubectl apply -f k8s/frontend-deployment.yaml -n staging
kubectl get pods -n staging
```

## Jenkins Notes
- Create nodes with labels:
  - `nodejs`: has Node.js 18+
  - `docker`: has Docker CLI/daemon privileges
  - `k8s`: has kubectl with kubeconfig to your cluster
- Set `REGISTRY` env to your Docker registry (e.g., docker.io/<user>).
- Replace the sample "push" echo in Jenkinsfile with real docker login + push.
