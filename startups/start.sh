[ -z $1 ] && echo 'Environment not specified' && exit 1
ENV=$1
CUSTOMER=$2
# stop service
NODE_ENV=$ENV CONFIG_DIR=/home/$CUSTOMER/cwg-market/$ENV/config/cwg-market/  pm2 stop /home/$CUSTOMER/cwg-market/$ENV/app.js 
# start service
NODE_ENV=$ENV CONFIG_DIR=/home/$CUSTOMER/cwg-market/$ENV/config/cwg-market/  pm2 start /home/$CUSTOMER/cwg-market/$ENV/app.js 