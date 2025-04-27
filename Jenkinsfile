pipeline {

    agent any

    environment {
        IMAGE_NAME = 'electricity-site'
        DOCKERHUB_CREDENTIALS = 'dockerhub'  // Credentials for DockerHub
    }

    stages {

        stage('Clone') {
            steps {
                // Checkout the code from the Git repository
                git branch: 'main', url: 'https://github.com/ArcaneNova/electric-site.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    dockerImage = docker.build("${IMAGE_NAME}")
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Run the Docker container
                    dockerImage.run("-d -p 8080:80")
                }
            }
        }

        stage('Test') {
            steps {
                // Perform a basic HTTP check to see if the container is up and responding
                sh 'curl -I http://localhost:8080'
            }
        }

        stage('Push to DockerHub') {
            when {
                branch 'main' // Push to DockerHub only for the main branch
            }
            steps {
                // Push the image to DockerHub with the appropriate credentials
                withDockerRegistry([ credentialsId: DOCKERHUB_CREDENTIALS, url: '' ]) {
                    script {
                        dockerImage.push("latest")
                    }
                }
            }
        }

    }

    post {
        always {
            // Clean up Docker containers and images to avoid clutter after each build
            cleanWs()
        }

        success {
            echo 'Build and deployment succeeded!'
        }

        failure {
            echo 'Build or deployment failed.'
        }
    }

}