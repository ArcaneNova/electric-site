pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Jenkins Credential ID
        DOCKERHUB_USERNAME = 'arshadnoor585' // your DockerHub username
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ArcaneNova/electric-site'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        docker.build("${DOCKERHUB_USERNAME}/electric-frontend", "-f Dockerfile .")
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Add unit tests here (Node.js/React)'
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        docker.image("${DOCKERHUB_USERNAME}/electric-frontend").push('latest')
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