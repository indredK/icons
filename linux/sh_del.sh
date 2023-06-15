#!/bin/bash
user="root"
pem="./linux/p.pem"
ip="59.110.53.198"


# 删除sudo下的所有docker
ssh -i $pem $user@$ip 'sudo docker stop $(sudo docker ps -aq)'



