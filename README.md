# Middleware-graphql

Microservice supporting graphql requirements in Connections
- Orient / ActivityStream
- ITM
- Mail service


[![Build Status](https://jenkins.cwp.pnp-hcl.com/cnx/buildStatus/icon?job=Core/Pink/Connections/middleware-graphql/develop)](https://jenkins.cwp.pnp-hcl.com/cnx/job/Core/job/Pink/job/Connections/job/middleware-graphql/job/develop/)

To install the package for your app, use this following:

```sh
npm install @connections/middleware-graphql --save
```
# Build 
### Local Build
Make sure that the correct node and npm versions are active.

1. Clone the middleware-graphql repo from HCL git e.g.

      ```sh
      git clone https://git.cwp.pnp-hcl.com/connections/middleware-graphql
      ```

2. Install / build middleware-graphql

    * Run the install process:

      ```sh
      $ cd <REPO_CLONE_DIR>/middleware-graphql 
      $ npm ci  # npm install if you want to pick up package updates
      ```

   * Run the application build process:   

     ```sh
     npm run build
     ```
          
3. Start the `middleware-graphql` server app:

    ```sh
    npm run start
    ```

4. Verify that the app responds to health probe by entering `localhost:3000` in browser and the response should be:

    ```json
    {"started":"2022-12-27T09:51:44.685Z","uptime":17.92}
    ```

# Testing
For development of any features or bug fixing (where local config can be used) it is useful to be able to run the middleware-graphql code on your local machine. The following was documented from a windows setup but is also possible on linux.

## Local Unit Testing
To run unit tests locally:

```sh
npm run test
```
```
Result - 
...
...
...
=============================== Coverage summary ===============================
Statements   : 77.91% ( 328/421 )
Branches     : 54.8% ( 97/177 )
Functions    : 64.56% ( 51/79 )
Lines        : 78.1% ( 328/420 )
================================================================================
```

# Deployment

- clone GitHub @ https://git.cwp.pnp-hcl.com/connections/middleware-graphql
- run build and test
```
npm install
npm run build
npm run test
```
- build container
```
docker build --no-cache --tag connections-docker.artifactory.cwp.pnp-hcl.com/middleware-graphql:development -f Dockerfile .
```
- run container
```
docker run -it connections-docker.artifactory.cwp.pnp-hcl.com/middleware-graphql:development
```

### On Pool Server -

- Save as tar, scp to machine
  - Save this image to a tar file
  - scp over to CP box
  ```
  docker save -o middleware-graphql.tar connections-docker.artifactory.cwp.pnp-hcl.com/middleware-graphql:development

  scp middleware-graphql.tar lcuser@lcauto2.cnx.cwp.pnp-hcl.com:/tmp
  ```

- Import image into containerd
  - SSH into machine
  - Import image:
    ```
    sudo ctr -n=k8s.io image import /tmp/middleware-graphql.tar
    ```

- Edit deployment for container
    ```
    kubectl edit deployment/middleware-graphql -n connections
    ```

- Update image label
  - Find the image value and change it from its current label to
  ```
  image: connections-docker.artifactory.cwp.pnp-hcl.com/middleware-graphql:development
  ```
- Save deployment file and image will reload


# Troubleshooting
- SSH into machine
- Edit log for container
    ```
    kubectl edit deployment/middleware-graphql -n connections
    ```

- Update LOGGING_LEVEL label
  - Find the LOGGING_LEVEL value and change it from its TRACE label to
  ```
  value: TRACE
  ```
- Save deployment file
- Check pod for middleware graphql logs -
  ```
  kubectl get pods
  
  kubectl logs <middleware graphql pod name>
  eg:-
  kubectl logs middleware-graphql-5f46bb7744-xbq8k
  ```
