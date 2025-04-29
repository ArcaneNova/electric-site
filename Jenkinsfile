pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()  // Cleans the workspace before starting
            }
        }

        stage('Checkout Code') {
            steps {
                // Ensure to checkout from the correct repository and branch
                git url: 'https://github.com/ArcaneNova/electric-site', branch: 'main', clean: true
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
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
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
