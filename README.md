# AWS DevTools Project Documentation

[Image resource](./Screenshot%202024-07-29%20110336.png)

## Introduction

This project demonstrates how to use AWS DevTools to create a pipeline, build, and deploy an application on an EC2 instance. Below is a step-by-step guide on setting up the project using various AWS services.

Before stating anything just checkout the video : how to create EC2 on aws and launch the instace with ubuntu or any other OS with static IP address 
- here is the Link ([AWS EC2](https://www.youtube.com/watch?v=-FKQwXtrSSQ&pp=ygUIYXdzIGVjMiA%3D))

## Steps

### 1. Create an IAM User

Before starting with AWS DevTools, create an IAM user with the necessary permissions. This user will be used to manage resources and access various AWS services.

- Go to the [IAM Console](https://console.aws.amazon.com/iam/home).
- Create a new user with `Programmatic access` and attach policies for CodeCommit, CodeBuild, S3, and EC2.

### 2. Set Up AWS CodeCommit

Create a repository in AWS CodeCommit to host your source code.

- Navigate to the [CodeCommit Console](https://console.aws.amazon.com/codecommit/home).
- Create a new repository and note down the repository URL.
- Add this repository as a remote in your local Git setup:

    ```bash
    git remote add origin <CodeCommit repository URL>
    ```

### 3. Add and Push Code to CodeCommit

Commit your local code changes and push them to the CodeCommit repository.

- Stage and commit your code:

    ```bash
    git add .
    git commit -m "Initial commit"
    ```

- Push the code to the CodeCommit repository:

    ```bash
    git push -u origin master
    ```

### 4. Create a CodeBuild Project

Create a CodeBuild project to automate the build process.

- Go to the [CodeBuild Console](https://console.aws.amazon.com/codebuild/home).
- Create a new build project and specify the source as your CodeCommit repository.
- Create a service role with permissions for CodeBuild and attach it to the project.

### 5. Configure `buildspec.yml`

Create a `buildspec.yml` file in the root of your project. This file configures the build commands and settings.
just check my buildspec.yml file in the root dir.

### 6. Set Up AWS CodeDeploy

Configure AWS CodeDeploy to manage the deployment of your application.

- Go to the [CodeDeploy Console](https://console.aws.amazon.com/codedeploy/home).
- Create a new deployment application. Choose the deployment type based on your needs (e.g., EC2/On-Premises).
- Configure the deployment group within the application. Specify the EC2 instances (or tags) where the application should be deployed.

### 7. Install and Configure the CodeDeploy Agent

Install the CodeDeploy agent on your EC2 instance to enable it to receive deployments from CodeDeploy.

- Connect to your EC2 instance using SSH.
- Follow the instructions provided in the [CodeDeploy Agent Installation Guide](https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-configuration.html)
for install codeagent check my file [codedeploy_agent](./codeagent.txt)

For more information, visit the [AWS CodeDeploy Console](https://console.aws.amazon.com/codedeploy/home).


 

Here is the full resources or above all steps: [Youtube video link](https://www.youtube.com/watch?v=p5i3cMCQ760)
codepipline and EC2 deploy in this video & codeagent install: [link](https://www.youtube.com/watch?v=IUF-pfbYGvg&t=650s)


