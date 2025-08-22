pipeline {
  agent none

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 30, unit: 'MINUTES')
  }

  environment {
    REGISTRY = "docker.io/your-org"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
    SONARQUBE_SERVER = "SonarQube"
  }

  stages {
    // stage('Checkout') {
    //   agent { label 'nodejs' }
    //   steps { checkout scm }
    // }

    stage('Code Quality & Security') {
      agent { label 'nodejs' }
      steps {
        dir('backend') {
          sh 'npm ci'
          sh 'npm run lint'
          sh 'npm test'
        }
        dir('frontend') {
          sh 'npm ci'
          sh 'npm run lint'
          sh 'npm test'
        }
      }
    }

    stage('Build Docker Images') {
      agent { label 'docker' }
      steps {
        sh '''
          docker build -t $REGISTRY/backend:$IMAGE_TAG backend/
          docker build -t $REGISTRY/frontend:$IMAGE_TAG frontend/
          echo "Skipping docker push in sample. Replace with docker login && docker push to use."
        '''
      }
    }

    stage('Deploy to Staging (K8s)') {
      agent { label 'k8s' }
      steps {
        sh '''
          kubectl apply -f k8s/backend-deployment.yaml -n staging
          kubectl apply -f k8s/frontend-deployment.yaml -n staging
          kubectl rollout status deploy/backend -n staging
          kubectl rollout status deploy/frontend -n staging
        '''
      }
    }

    stage('Smoke Tests') {
      agent { label 'nodejs' }
      steps {
        sh 'node frontend/smoke.js'
      }
    }
  }

  post {
    always {
      echo "Build: ${currentBuild.currentResult}"
    }
  }
}
