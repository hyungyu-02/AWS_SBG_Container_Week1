# Container Track Week 1

Helm Chart를 이용해 간단한 WAS를 Kubernetes에 배포하는 실습

## 구조

```text
.
├── charts
│   └── myapp
│       ├── Chart.yaml
│       ├── templates
│       │   ├── deployment.yaml
│       │   ├── ingress.yaml
│       │   └── service.yaml
│       ├── values-dev.yaml
│       └── values.yaml
├── Dockerfile
└── server.js
```

## 설치

```bash
minikube start --driver=docker --cpus=2 --memory=4096
minikube addons enable ingress

docker build -t myapp:v1 .
minikube image load myapp:v1

helm install myapp ./charts/myapp -f ./charts/myapp/values-dev.yaml
```

확인:

```bash
kubectl get deploy,pod,svc,ingress
```

macOS에서 Ingress 접근:

```bash
minikube tunnel
```

다른 터미널에서:

```bash
curl -H "Host: myapp.local" http://127.0.0.1/
```

## 하나의 Chart로 묶은 리소스

- Deployment
- Service
- Ingress

세 리소스 모두 하나의 WAS를 배포하고 외부 요청을 전달하기 위해 같이 필요한 리소스라서 하나의 Chart로 묶었다.

- Deployment: Pod 개수와 실행 상태 관리
- Service: Pod들을 네트워크 대상으로 묶음
- Ingress: 외부 요청을 Service로 전달

`ingress-nginx-controller`는 특정 애플리케이션 전용이 아니라 클러스터 공용 인프라이므로 Chart에 포함하지 않았다.
