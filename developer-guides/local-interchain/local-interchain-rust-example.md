---
description: >-
  Learn how to seamlessly integrate Rust CosmWasm contracts into your GitHub
  workflow. Follow our step-by-step guide to set up your project, configure
  chain parameters, write tests, and automate.
---

# Local Interchain Rust Example

##

{% embed url="https://www.youtube.com/watch?v=yRpYYp5ZSCQ" %}

## **Step-by-Step Guide to Running Rust Cosm Wasm Contracts in GitHub Workflow**

#### **Prerequisites:**

1. Make sure you have Rust and CosmWasm contract development environment set up on your local machine.
2. Create a GitHub repository where you want to host your Rust CosmWasm contract project.

### **Step 1: Set Up Your Project**

* Clone or create a new GitHub repository for your Rust CosmWasm contract project.

### **Step 2: Organize Your Project**

* Inside your project, create a `source` folder. This folder will contain your standard CosmWasm contract with messages (e.g., increment and reset).

### **Step 3: Create an Interchange Test Folder**

* Within your project, create an `interchain-test` folder. This folder will be used to set up tests for your contract.

### **Step 4: Define Chain Configuration**

* Determine the configuration you want for your blockchain. Define the necessary configuration settings, such as the chain parameters, and consider any startup commands required.

### **Step 5: Use Environment Variables**

* Abstract away some of the configuration requirements into environment variables. This allows you to specify different configurations for different chains without much hassle.

### **Step 6: Configure Relayer and Server (Optional)**

* If needed, configure the relayer and server settings for your project. This step may not be necessary for all users.

### **Step 7: Write Your Tests**

* Within the `interchain-test` folder, write the tests you want to perform on your CosmWasm contract. This could include instantiation, querying, and incrementing the contract's state.

### **Step 8: Set Up GitHub Workflow**

* In your GitHub repository, create an `.github/workflows` directory if it doesn't already exist.
* Inside the `.github/workflows` directory, create an `end-to-end.yml` file. This workflow file will trigger when a pull request or push happens to specific branches.

### **Step 9: Define GitHub Workflow Actions**

* In the `end-to-end.yml` workflow file, define the following actions:
  * Download the interchain test.
  * Set up and automatically install the interchain binary.
  * Run your contract tests. You can run any tests you want, including uploading the wasm file and starting your contract on a specific port.
  * Ensure that the tests pass without errors.

### **Step 10: Workflow Completion**

* If all the tests have passed without any issues, the GitHub workflow will automatically kill the contract instance, exit out, and mark the entire workflow as completed.

#### **Conclusion:**

Following this step-by-step guide, you can set up and run Rust CosmWasm contracts in a GitHub workflow using the local interchain tool. This ensures that your contract works in both local and GitHub environments, providing convenience and reliability for your project development and testing.

\
