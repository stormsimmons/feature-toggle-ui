apt install -y letsencrypt
letsencrypt certonly -n --standalone --email xyzblocks@gmail.com -d foggle.io
letsencrypt certonly -n --standalone --email xyzblocks@gmail.com -d app.foggle.io

echo "0 16 */2 * * /usr/bin/letsencrypt certonly -n --standalone --email xyzblocks@gmail.com -d foggle.io > /var/log/crontab.log" >> /etc/crontab
echo "0 17 */2 * * /usr/bin/letsencrypt certonly -n --standalone --email xyzblocks@gmail.com -d app.foggle.io > /var/log/crontab.log" >> /etc/crontab

apt update
apt install -y nginx
ufw allow 'Nginx Full'
systemctl enable nginx
curl -o /etc/nginx/sites-enabled/foggle.io https://raw.githubusercontent.com/xyzblocks/feature-toggle-ui/master/deployment/nginx.conf

docker run -d --name foggle-io -p 8081:80 xyzblocks/foggle-io

docker run -d --name app-foggle-io -p 8082:80 xyzblocks/app-foggle-io

docker run -d --name feature-toggle-nodejs -p 8083:8080 -e "AUDIENCE=SJytKyPQ5eiPtmIrxdmFmun3JKtXmkAR" -e "AUTHORITY=https://xyzblocks.auth0.com" -e "CONNECTION_STRING=" -e "HOST=0.0.0.0"  xyzblocks/feature-toggle-nodejs
