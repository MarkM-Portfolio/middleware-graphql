## Docker deployment files
Microservices are packaged into Docker containers that can be run in Kubernetes orchestration.

For a NodeJS project it is recommended to run the DockerfileCacheNPM container as a parent to your main production container. Run less frequently it can do a full

`npm install --production`.

This is then the parent to your main Dockerfile and speeds up your overall build/run time.

#### Dockerfile
Image to run the node server only based on prod build scripts and exposed on port 8000 in this example

Build
> docker build -f deployment/Dockerfile -t artifactory.swg.usma.ibm.com:6556/conncloud/microservice-template .

Run
> docker run  -it -p 3000:3000 artifactory.swg.usma.ibm.com:6556/conncloud/microservice-template

#### DockerfileCacheNPM
This is an image which exists solely to cache the install of project dependencies. If changing the package.json the following needs to be run. If your Dockerfile inherits this then it will pick up the changes.

> docker build -f deployment/DockerfileCacheNPM -t artifactory.swg.usma.ibm.com:6556/conncloud/microservice-template-base .

There are many benefits to this, given that packages do not change frequently you can get a massive performance boost by speeding up your CI docker build. Your local docker-engine will cache the base layer where required.
