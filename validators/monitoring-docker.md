# Overview 
[Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) will allow you to run the required monitoring applications with a few commands. These instructions will run the following:

* [Grafana](https://grafana.com/oss/grafana/) on port `3000`: An open source interactive analytics dashboard.
* [Prometheus](https://www.prometheus.io/) on port `9090`: An open source metric collector.
* [Node Exporter](https://github.com/prometheus/node_exporter) on port `9100`: An open source hardware metric exporter.

## Preparing your environment 
* You will need to install docker and docker-compose.
* The following instructions assume Ubuntu 20.04 on an x86-64 CPU.

### Install Docker
1. Remove older installations:
```bash:
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```
2. Update the apt package index and install packages to allow apt to use a repository over HTTPS:
```bash:
 $ sudo apt-get update
 $ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
3. Add Docker’s official GPG key:
```bash:
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
4. Setup the docker stable repository:
```bash
$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
5. Install docker:
```bash
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```
3. Test the installation:
```bash
$ sudo docker run hello-world
```

### Install Docker Compose
1. Download the current stable release of Docker Compose:
```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
2. Apply executable permissions to the binary:
```bash
$ sudo chmod +x /usr/local/bin/docker-compose
```
3. Test the installation:
```bash
$ docker-compose --version
```

## Setup and Configuration
1. Clone the [node_tooling repo](https://github.com/LavenderFive/node_tooling) and decend into the monitoring folder:
```bash
$ git clone https://github.com/LavenderFive/node_tooling.git
$ cd ./node_tooling/monitoring
```

2. In the prometheus folder, modify cosmos.yaml, replace `NODE_IP` with the IP of your node. (If your node is on the docker host machine, use `172.17.0.1`)
```bash
$ nano ./prometheus/cosmos.yaml
```

3. Replace the default prometheus config with the modified cosmos.yaml
```bash
$ mv ./prometheus/prometheus.yml ./prometheus/prometheus.yml.orig
$ cp ./prometheus/cosmos.yaml ./prometheus/prometheus.yml
```

## Start the Containers
1. Start the contrainers deploying the monitoring stack (Grafana + Prometheus + Node Exporter):
```bash
$ docker-compose --profile monitor up -d
```
2. Login to Grafana at `http://your-ip:3000` with username `admin` and password `admin`

The containers will restart automatically after rebooting unless they are stopped manually.

## Using the Cosmos SDK Grafana Dashboard
The dashboard for Cosmos SDK nodes is pre-installed, to use it:

1. Enable Tendermint metrics in your juno-node
```bash:
sed -i 's/prometheus = false/prometheus = true/g' <YOUR-NODE-HOMEDIR>/config/config.toml
```
After restarting your node, you should be able to access the tendermint metrics(default port is 26660): [http://localhost:26660](http://localhost:26660/)

2. **(If you did not replace `NODE_IP` with the IP of your node in the prometheus config)**, do so now. (If your node is on the docker host machine, use `172.17.0.1`)
```bash
$ nano ./prometheus/prometheus.yml
$ docker-compose down
$ docker-compose --profile monitor up -d
```

3. Login to grafana and open the Cosmos Dashboard from the [Manage Dashboards](http://localhost:3000/dashboards) page.
4. Set the chain-id to `juno-1`

## Application Ports
The docker images expose the following ports:

* `3000` Grafana. Your main dashboard. Default login is admin\admin.
* `9090` Prometheus. Access to this port should be restricted.
* `9100` Node Exporter. Access to this port should be restricted.
* Your juno node metrics on port `26660` should also be restricted.

If you followed the basic security guide, these ports are already restricted. You will need to allow the grafana port:

`sudo ufw allow 3000`

You can also allow access from a specific IP if desired:

`sudo ufw allow from 123.123.123.123 to any port 3000`

## Stop the Containers
1. From the `node_tooling/monitoring` directory:
```
$ docker-compose down
```
