pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ArcaneNova/electric-site.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-nextjs-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop nextjs-container || true
                docker rm nextjs-container || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p 3020:3000 --name nextjs-container my-nextjs-app'
            }
        }
    }
}
