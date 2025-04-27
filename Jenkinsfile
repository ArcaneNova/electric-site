pipeline {

    agent any



    environment {

        IMAGE_NAME = 'electricity-site'

    }



    stages {

        stage('Clone') {

            steps {

                git 'https://github.com/ArcaneNova/electric-site.git'

            }

        }



        stage('Build Docker Image') {

            steps {

                script {

                    dockerImage = docker.build("${IMAGE_NAME}")

                }

            }

        }



        stage('Run Container') {

            steps {

                script {

                    dockerImage.run("-d -p 8080:80")

                }

            }

        }



        stage('Test') {

            steps {

                sh 'curl -I http://localhost:8080'

            }

        }



        // Optional

        stage('Push to DockerHub') {

            when {

                expression { return false } // Set to true if pushing to DockerHub

            }

            steps {

                withDockerRegistry([ credentialsId: 'dockerhub', url: '' ]) {

                    script {

                        dockerImage.push("latest")

                    }

                }

            }

        }

    }

}