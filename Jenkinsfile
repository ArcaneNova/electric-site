pipeline {
    agent {
        docker {
            image 'node:18-alpine'   // Node.js with npm
            args '-u root:root'      // Optional: ensures permission access
        }
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKERHUB_USERNAME = 'arshadnoor585'
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/electric-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ArcaneNova/electric-site'
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        docker.build("${IMAGE_NAME}", "-f Dockerfile .")
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        docker.image("${IMAGE_NAME}").push('latest')
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }
    }
}
