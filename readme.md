# Learnify

Learnify is a comprehensive course recommendation platform designed to help users achieve their learning goals efficiently. The platform, built with Angular and Node.js, incorporates AI and data science functionalities using Python and Flask. PostgreSQL is employed as the database, and the entire application is containerized using Docker. For those interested in container orchestration, Kubernetes manifests are also provided.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Docker Usage](#docker-usage)
  - [Kubernetes Deployment](#kubernetes-deployment)
- [Website Demonstration](#website-demonstration)
- [UI Preview](#ui-preview)

## Introduction

Learnify is a course recommendation platform that enables users to input learning preferences, budget constraints, and weekly time commitments. Leveraging AI and data science, the platform generates a master course—a curated set of courses tailored to the user's objectives. The technology stack includes Angular for the frontend, Node.js for the backend, Python and Flask for AI/data science, and PostgreSQL as the database. Docker is employed for seamless deployment and scaling, with optional Kubernetes support.

## Getting Started

### Prerequisites

Before starting, ensure you have the following installed:

- Node.js
- Angular CLI
- Python
- Flask
- PostgreSQL
- Docker (optional)
- Kubernetes (optional)

### Local Setup

1. **Clone the Learnify repository:**

   ```bash
   git clone https://github.com/sanchi-t/Learnify.git
   cd learnify

2. **Install frontend and backend dependencies:**

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install

3. **Install Python Dependencies:**
    Ensure you have the required Python dependencies installed for the AI/model component:

    ```bash
    # Install Python dependencies
    cd ../model
    pip install -r requirements.txt

4. **Create a .env file in the server folder with the following content:**

    ```bash
    NODE_ENV=development
    PORT=<port>
    MODEL_API=<model api>
    POSTGRESQL_DB_HOST = <host>
    POSTGRESQL_DB_USER = <username>
    POSTGRESQL_DB_PASSWORD = <password>
    POSTGRESQL_DB = <database name>


5. **Create an environment.ts file in the client/src/environments folder with the following content:**

    ```bash
    export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000', // Adjust if necessary
    };

6. **Start the backend server:**

    ```bash
    cd server
    node index

7. **In a separate terminal, start the Angular frontend:**

    ```bash
    cd client
    ng serve


8. **Open your browser and navigate to http://localhost:4200 to access Learnify**



### Docker Usage

Docker images can be built using the provided Dockerfiles. Make sure Docker is installed.

1. **Build the backend Docker image:**

   ```bash
   docker build -t learnify-backend -f server/Dockerfile .


2. **Build the frontend Docker image:**

   ```bash
   docker build -t learnify-frontend -f client/Dockerfile .

3. **Build the flask Docker image:**

   ```bash
   docker build -t learnify-model -f model/Dockerfile .

4. **Run Docker containers:**

    ```bash
    docker run -d -p 3000:3000 learnify-backend
    docker run -d -p 8080:80 learnify-frontend
    docker run -d -p 5000:5000 learnify-frontend



### Kubernetes Deployment
Kubernetes manifests are available in the `kubernetes` folder.


1. **Install `kubectl`:**
Follow the instructions [here](https://kubernetes.io/docs/tasks/tools/) to install `kubectl` for your specific operating system.


2. **Install `minikube`:**
Follow the instructions [here](https://minikube.sigs.k8s.io/docs/start/) to install `minikube` for your specific operating system.


3. **Start `minikube` cluster:**

   ```bash
   minikube start

4. **Apply the manifests:**

   ```bash
   kubectl apply -f kubernetes/


5. **Access the Learnify application through the exposed services:**

   ```bash
   minikube service learnify-frontend

### Website Demonstration

https://github.com/sanchi-t/Learnify/assets/98596642/0c700c41-cda7-4b5e-98f1-d9936da5ddfc

### UI Preview

![WhatsApp Image 2023-11-21 at 10 17 50_f2b08ce2](https://github.com/sanchi-t/Learnify/assets/98596642/5e7533c3-d2a4-4ad1-a087-d01ec4cb8100)
![WhatsApp Image 2023-11-21 at 10 18 35_f6113c82](https://github.com/sanchi-t/Learnify/assets/98596642/a65f5373-d150-4815-8734-788b23d48c4d)
![WhatsApp Image 2023-11-21 at 10 17 50_107689e9](https://github.com/sanchi-t/Learnify/assets/98596642/a58bbaac-37d4-4273-a1a0-dd9c77afa9eb)
![WhatsApp Image 2023-11-21 at 10 18 34_40c5cfa8](https://github.com/sanchi-t/Learnify/assets/98596642/9271f84a-c4bf-4eb2-97d9-2edd3c5ccf32)
![WhatsApp Image 2023-11-21 at 10 18 34_cbf59b3d](https://github.com/sanchi-t/Learnify/assets/98596642/ffba076b-bbad-4a2f-a8e4-b15a10e613eb)
![WhatsApp Image 2023-11-21 at 10 18 34_3139bcf3](https://github.com/sanchi-t/Learnify/assets/98596642/68dd067d-94b0-433b-8018-f66386fa537e)
![WhatsApp Image 2023-11-21 at 10 18 35_7b7a3764](https://github.com/sanchi-t/Learnify/assets/98596642/b5571cb3-2c24-4a19-9a82-3d199619735b)
![WhatsApp Image 2023-11-21 at 10 18 36_2bc6b7c0](https://github.com/sanchi-t/Learnify/assets/98596642/0876eb6b-707f-4583-abd8-1452b510b9d2)
![WhatsApp Image 2023-11-21 at 10 17 19_db5b2725](https://github.com/sanchi-t/Learnify/assets/98596642/44f49a4c-5113-46ef-b5f5-a6f3150fe58b)
![WhatsApp Image 2023-11-21 at 10 17 19_8fcb85e5](https://github.com/sanchi-t/Learnify/assets/98596642/21f037b1-077e-4627-a284-3db096fdc482)








