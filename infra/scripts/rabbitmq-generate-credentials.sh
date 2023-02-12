#!/bin/zsh

clusterId=$1

if [ -z "$clusterId" ]; then
  echo "RabbitMQ Cluster name is required"
  exit
fi

if [ -z "$2" ]; then
  echo "Add the env file destination"
  exit
fi

username="$(kubectl get secret "$clusterId-default-user" -o jsonpath='{.data.username}' | base64 --decode)"
password="$(kubectl get secret "$clusterId-default-user" -o jsonpath='{.data.password}' | base64 --decode)"

printf "RabbitMQ Credentials\nUsername:%s\nPassword:%s\n" "$username" "$password"

for envPath in "${@:2}"; do

  if ! test -f "$envPath"; then
    touch "$envPath" && echo """
RABBITMQ_USERNAME=temp
RABBITMQ_PASSWORD=temp
        """ >"$envPath"
  fi

  echo "Setting env for $envPath"

  sed -i .bu "s/RABBITMQ_USERNAME=.*/RABBITMQ_USERNAME=$username/g" "$envPath"
  sed -i .bu "s/RABBITMQ_PASSWORD=.*/RABBITMQ_PASSWORD=$password/g" "$envPath"
done
