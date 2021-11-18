# The Practice of using DynamoDB with AWS SDK for JavaScript

This is a personal note about how to use the methods in AWS SDK to manipulate DynamoDB.

## Get and config an AWS account

[Register an AWS account](https://aws.amazon.com/jp/), create an IAM user for the project, and download the access keys. Easer to follow this [step-by-step video](https://www.youtube.com/watch?v=KngM5bfpttA)

## Install packages

```bash
$ npm i -D aws-sdk
$ npm i -D dotenv
```

## Execute

```bash
$ node -r dotenv/config file-to-execute.js
```
