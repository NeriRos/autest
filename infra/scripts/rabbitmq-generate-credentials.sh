#!/bin/zsh

clusterId=$1
envPath=$2

if [ -z "$clusterId" ]; then
  echo "RabbitMQ Cluster name is required"
  exit
fi

if [ -z "$envPath" ]; then
  echo "Add the env file destination"
  exit
fi

username="$(kubectl get secret "$clusterId-default-user" -o jsonpath='{.data.username}' | base64 --decode)"
password="$(kubectl get secret "$clusterId-default-user" -o jsonpath='{.data.password}' | base64 --decode)"

if ! test -f "$envPath"; then
  touch $envPath && echo """
    RABBITMQ_USERNAME=temp
    RABBITMQ_PASSWORD=temp
    """ >$envPath
fi

echo "Replacing $(cat $envPath | grep RABBITMQ_USERNAME) with: RABBITMQ_USERNAME=$username"
sed -i .bu "s/RABBITMQ_USERNAME=.*/RABBITMQ_USERNAME=$username/g" $envPath

echo "Replacing $(cat $envPath | grep RABBITMQ_PASSWORD) with: RABBITMQ_PASSWORD=$password"
sed -i .bu "s/RABBITMQ_PASSWORD=.*/RABBITMQ_PASSWORD=$password/g" $envPath
