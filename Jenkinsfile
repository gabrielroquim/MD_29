pipeline {
    agent any
    
    tools {nodejs "node"}

    stages {
        stage('Clonar o repositorio') {
            steps {
                git branch: 'master', url: 'https://github.com/gabrielroquim/MD_29'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Executar no browserstack') {
            steps {
                sh 'npm run android.browserstack.app'
            }
        }
    }
}