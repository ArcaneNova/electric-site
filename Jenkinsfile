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
                    // Use docker image to execute commands within container
                    docker.image('node:18-alpine').inside {
                        dir('frontend') {
                            sh 'npm install' // Install dependencies
                            sh 'npm run build' // Build the project
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image with the correct tag
                    sh 'docker build -t arshadnoor585/electric-site:latest .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub using credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
                        // Push the Docker image to Docker Hub
                        sh 'docker push arshadnoor585/electric-site:latest'
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after the build
            cleanWs()
        }
    }
}