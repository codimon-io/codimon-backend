# users service

## DB migrations
#### Set db env
change the values of the .env file

#### Up migrations
```
npm run db-migrate up
```

#### Down migrations
```
npm run db-migrate down
```

#### Create a new migrations
```
npm run db-migrate create nameOfMigration
```

## Docker commands

Build
```
docker build -t codimon/users .
```

Run
```
docker run codimon/users

docker run -p 4000:80 --env-file .env codimon/users

docker run -it codimon/users sh

docker exec -it codimon/users [cmd]
```

Print out information about all of the running containers
```
docker ps
```

Docker logs
```
docker logs codimon/users
```

Publish image
```
docker push codimon/users
```

More commands
```
docker build -t friendlyhello .  # Create image using this directory's Dockerfile
docker run -p 4000:80 friendlyhello  # Run "friendlyhello" mapping port 4000 to 80
docker run -d -p 4000:80 friendlyhello         # Same thing, but in detached mode
docker container ls                                # List all running containers
docker container ls -a             # List all containers, even those not running
docker container stop <hash>           # Gracefully stop the specified container
docker container kill <hash>         # Force shutdown of the specified container
docker container rm <hash>        # Remove specified container from this machine
docker container rm $(docker container ls -a -q)         # Remove all containers
docker image ls -a                             # List all images on this machine
docker image rm <image id>            # Remove specified image from this machine
docker image rm $(docker image ls -a -q)   # Remove all images from this machine
docker login             # Log in this CLI session using your Docker credentials
docker tag <image> username/repository:tag  # Tag <image> for upload to registry
docker push username/repository:tag            # Upload tagged image to registry
docker run username/repository:tag                   # Run image from a registry
docker logs username/repository:tag   # See logs
docker ps   # Print out information about all of the running containers
```

## Kubernetes commands

Deploy docker image to k8s
```
kubectl apply -f users-depl.yaml
```

Restart deployment
```
kubectl rollout restart deployment users-depl
```

Get pods
```
kubectl get pods
```

Other commands
```
kubectl exec -it [pod name] sh
kubectl logs [pod name]
kubectl delete pod [pod name]
kubectl describe pod [pod name]
```

Deployments commands
```
kubectl get deployments
kubectl describe deployment [deployment name]
kubectl apply -f [config file name]
kubectl delete deployment [deployment name]
kubectl delete pod [pod name]
kubectl rollout restart deployment [deployment name]
```

Services commands
```
kubectl get services
kubectl describe services [services name]
```