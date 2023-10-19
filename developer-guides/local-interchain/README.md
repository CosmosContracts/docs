---
description: >-
  Learn how to spin up a single or multiple testnets for Juno using the Local
  Interchain Repo
---

# Local Interchain

{% embed url="https://youtu.be/BLscptKFJ2k?si=GdjHEAzo_VqlWFyz" %}

### **Step 1: Access the Interchain Test Repository**

* The first thing you need to do is head over to the Interchain Test Repository. This repository is designed to help you launch and interact with local chains, including Juno.

### **Step 2: Locate the Repository**

* You can find the repository at "Strange Love ventures slash interchain test."

### **Step 3: Access the Local Interchange Folder**

* Within the repository, locate and click on the "Local Interchain" folder. Inside this folder, you will find the setup guide for Mac, Linux, Windows, and Windows server.

### **Step 4: Installation (Mac or Linux)**

* If you are using Mac or Linux, open your terminal.
* Change the directory to the location where you want to clone the interchain Test Repository.
* Clone the repository by running the following command:

```bash
git clone https://github.com/strangelove-ventures/interchaintest
```

* Change into the "local interchain" directory once the cloning is complete.
* Install the binary by running the following commands:

```go
go mod tidy
make install
```

* You can now access Local Interchain using the command "local-ic."

<figure><img src="../../.gitbook/assets/Screenshot 2023-10-14 at 10.16.17.png" alt=""><figcaption></figcaption></figure>

### **Step 5: Explore Local Interchain Features**

* Local Interchain is a tool to build and launch private test networks for chains.
* You can configure various aspects of your test network, including chain versions, gas prices, validators, block times, and more using JSON configuration files.
* Local Interchain also allows you to specify accounts and control them within your test environment.

### **Step 6: Docker Handling**

* Local Interchange handles everything through Docker, so you don't need to install additional binaries.
* It provides REST API access for interacting with the chains and offers multiple programming languages, including Bash, Python, Rust, and Go.

### **Step 7: Create Test Chains**

* Local Interchain provides example configurations, such as Juno IBC, that you can use.
* You can specify which chain version to use, gas prices, coin types, and more in your configuration.
* You can also configure genesis settings to customize your testnet environment.

### **Step 8: Start Chains**

* Run the Local Interchain binary to check for chains.
* Start the desired chains based on your configurations. This will set up validators, connect the chains, and start a relayer to relay transactions between them.
* This process may take about 30 seconds initially but will be faster on subsequent starts.

### **Step 9: Verify Chain Status**

* Monitor the Docker processes to ensure that both chains are up and running.
* The relayer will connect the specified chains, and block times will be fast for quicker execution.

### **Step 10: Interact with Chains via REST API**

* You can interact with the chains using the REST API provided by Local Interchain.
* The REST API allows you to access node information, execute transactions, and upload contracts or files to the validators.

### **Step 11: Writing Tests**

* Developers can write tests in various programming languages like Rust, Python, or Go.
* Example test scripts are available in the repository to help you get started.
* Tests can involve interactions with contracts, cross-chain executions, and various other operations.

### **Step 12: Run Tests**

* Run your tests to validate the functionality of the local chains.
* Tests can include actions like uploading contracts, executing transactions, and querying chain data.

### **Step 13: Verify Results**

* Verify the results of your tests, ensuring that your interactions with the chains are successful.

By following these steps, you can set up and interact with local chains using the Interchain Test Repository and Local Interchain.

\
