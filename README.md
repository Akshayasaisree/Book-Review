BOOK RECOMMENDATION SYSTEM

#maven java automation
Maven Java Automation Steps:
 Step 1: Open Jenkins (localhost:8080)
   	 ├── Click on "New Item" (left side menu
Step 2: Create Freestyle Project (e.g., MavenJava_Build)
        	├── Enter project name (e.g., MavenJava_Build)
        	├── Click "OK"
└── Configure the project:
            		├── Description: "Java Build demo"
            		├── Source Code Management:
            			└── Git repository URL: [GitMavenJava repo URL]
            		├── Branches to build: */Main   or  */master
  		└── Build Steps:
               	     ├── Add Build Step -> "Invoke top-level Maven targets"
                  		└── Maven version: MAVEN_HOME
                 		└── Goals: clean
                	├── Add Build Step -> "Invoke top-level Maven targets"
                		└── Maven version: MAVEN_HOME
                		└── Goals: install
                	└── Post-build Actions:
                    	       ├── Add Post Build Action -> "Archive the artifacts"
                    			└── Files to archive: **/*
                    	     ├── Add Post Build Action -> "Build other projects"
                    			└── Projects to build: MavenJava_Test
                    			└── Trigger: Only if build is stable
                    	     └── Apply and Save


    └── Step 3: Create Freestyle Project (e.g., MavenJava_Test)
        	├── Enter project name (e.g., MavenJava_Test)
        	├── Click "OK"
              └── Configure the project:
             ├── Description: "Test demo"
             ├── Build Environment:
            		└── Check: "Delete the workspace before build starts"
            ├── Add Build Step -> "Copy artifacts from another project"
            		└── Project name: MavenJava_Build
            		└── Build: Stable build only  // tick at this
            		└── Artifacts to copy: **/*
            ├── Add Build Step -> "Invoke top-level Maven targets"
            		└── Maven version: MAVEN_HOME
            		└── Goals: test
            		└── Post-build Actions:
                ├── Add Post Build Action -> "Archive the artifacts"
                	└── Files to archive: **/*
                	└── Apply and Save

    └── Step 4: Create Pipeline View for Maven Java project
        ├── Click "+" beside "All" on the dashboard
        ├── Enter name: MavenJava_Pipeline
        ├── Select "Build pipeline view"         // tick here
         |--- create
        └── Pipeline Flow:
            ├── Layout: Based on upstream/downstream relationship
            ├── Initial job: MavenJava_Build
            └── Apply and Save OK

    └── Step 5: Run the Pipeline and Check Output
        ├── Click on the trigger to run the pipeline
        ├── click on the small black box to open the console to check if the build is success
            Note : 
            
   1.If build is success and the test project is also automatically triggered with name       
                      “MavenJava_Test”
2.The pipeline is successful if it is in green color as shown ->check the console of the test project
The test project is successful and all the artifacts are archived successfully
#pipeline

pipeline {

    agent any
    tools {
        maven 'Maven Home'
    }
    stages {
        stage('git repo & clean') {
            steps {
                bat '''
                    rmdir /s /q project 2>nul || echo no old folder
                    git clone https://github.com/aalla-pavani/project.git
                    mvn clean -f project/pom.xml
                '''
            }
        }
        stage('install') {
            steps {
                bat 'mvn install -f project/pom.xml'
            }
        }
        stage('test') {
            steps {
                bat 'mvn test -f project/pom.xml'
            }
        }
        stage('package') {
            steps {
                bat 'mvn package -f project/pom.xml'
            }
        }
    }
}


#minikube
minikube start
kubectl create deployment mynginx --image=nginx
if already created then 
kubectl set image deployment/myngnix nginx=nginx:latest
kubectl get deployments
kubectl get pods
kubectl describe pods
kubectl expose deployment mynginx --type=NodePort --port=80 --target-port=80
kubectl scale deployment mynginx --replicas=4
kubectl get svc
kubectl get service mynginx
kubectl port-forward svc/mynginx 8081:80
minikube tunnel
minikube service mynginx --url
Minikube dashboard

for stop and clean

kubectl delete deployment mynginx
kubectl delete service mynginx
minikube stop
minikube delete


Nagios Automation Steps

docker pull jasonrivers/nagios:latest
docker run --name nagiosdemo -p 8888:80 jasonrivers/nagios:latest
Open your browser and navigate to:http://localhost:8888
Login Credentials:
Username: nagiosadmin
Password: nagios
docker stop nagiosdemo
docker rm nagiosdemo
docker images
docker rmijasonrivers/nagios:latest

#aws
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
