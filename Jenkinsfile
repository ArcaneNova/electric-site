pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')  // Ensure Docker credentials are set in Jenkins
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()  // Cleans the workspace before starting
            }
        }

        stage('Checkout Code') {
            steps {
                // Checkout from the correct repository and branch
                git url: 'https://github.com/ArcaneNova/electric-site', branch: 'main'  // Removed the invalid 'clean' parameter
            }
        }

        stage('Install & Build in Docker') {
            steps {
                script {
                    // Pulling the node image and running npm build steps inside
                    docker.image('node:18-alpine').inside {
                        dir('frontend') {  // Navigating to the frontend directory
                            sh 'npm install'  // Installing dependencies
                            sh 'npm run build'  // Building the frontend
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image from the project root (make sure Dockerfile is in the root or adjust the context)
                    sh 'docker build -t arshadnoor585/electric-site:latest .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub with credentials
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
                        // Push the built image to Docker Hub
                        sh 'docker push arshadnoor585/electric-site:latest'
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean workspace after the pipeline run
            cleanWs()
        }
    }
}