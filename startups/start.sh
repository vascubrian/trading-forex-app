[ -z $1 ] && echo 'Environment not specified' && exit 1
ENV=$1
CUSTOMER=$2
# stop service
pm2 stop 0
# start service
pm2 start npm -- start