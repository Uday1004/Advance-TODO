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

Example `buildspec.yml`:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      python: 3.8
  build:
    commands:
      - echo "Building the application..."
      - python setup.py install

artifacts:
  files:
    - '**/*'
  discard-paths: yes
  ```

Here is the full resources or above all steps: [Youtube video link] (https://www.youtube.com/watch?v=p5i3cMCQ760)


