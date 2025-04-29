pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/ArcaneNova/electric-site', branch: 'main'
            }
        }

        stage('Install & Build in Docker') {
            steps {
                script {
                    docker.image('node:18-alpine').inside {
                        dir('frontend') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t arshadnoor585/electric-site:latest .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub-creds', url: '') {
                        sh 'docker push arshadnoor585/electric-site:latest'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
