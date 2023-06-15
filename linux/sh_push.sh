#!/bin/bash

# 导入 JSON 数据
data=$(cat ./package.json)
# 按json的name来命名
projextName=$(echo "$data" | sed -n 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\).*/\1/p')

# 设置本地和远程目录路径
projextType="web"

user="root"
localPath="docs-dist"
remotePath="/tmp/$projextType/$projextName"
port="3030"
ip="59.110.53.198"
nginxPath="/usr/share/nginx/html"
pem="./linux/p.pem"
confPath="/tmp/web/nginx.conf"
ngconfPath="/etc/nginx/nginx.conf"

# 删除远程目录
ssh -i $pem $user@$ip "sudo  rm -rf $remotePath/$localPath "
# 创建远程目录
ssh -i $pem $user@$ip "mkdir -p $remotePath/$localPath "

# 将本地目录上传到远程目录
scp -i $pem -r ./$localPath/ $user@$ip:$remotePath

# 停止原来的容器
ssh -i $pem $user@$ip "sudo docker stop $projextName"
# 删除原来的容器
ssh -i $pem $user@$ip "sudo docker rm $projextName"

# 执行远程的docker命令，用nginx代理，启动新的容器
ssh -i $pem $user@$ip "sudo docker run --name $projextName -v $remotePath/$localPath:$nginxPath:ro -v $confPath:$ngconfPath:ro -p $port:80 -d nginx && exit"

# 查看所有当前sudo身份的容器
ssh -i $pem $user@$ip "sudo docker ps && exit"

# 后面再对身份进行限制

echo 发布成功



