pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Start App') {
            steps {
                dir('backend') {
                    bat 'node server.js'
                }
            }
        }
    }
}