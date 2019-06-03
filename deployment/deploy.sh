# apt install -y letsencrypt
# letsencrypt certonly --standalone --email xyzblocks@gmail.com -d foggle.io
# letsencrypt certonly --standalone --email xyzblocks@gmail.com -d app.foggle.io

apt update
apt install -y nginx
ufw allow 'Nginx Full'
systemctl enable nginx
curl -o /etc/nginx/sites-enabled/foggle.io https://raw.githubusercontent.com/xyzblocks/feature-toggle-ui/master/deployment/nginx.conf

git clone https://github.com/xyzblocks/feature-toggle-ui.git

cd feature-toggle-ui/public
docker build --no-cache -t foggle-io .
docker run -d --name foggle-io -p 8081:80 foggle-io
cd ../..

cd feature-toggle-ui
docker build --no-cache -t app-foggle-io .
docker run -d --name app-foggle-io -p 8082:80 app-foggle-io
cd ..

git clone https://github.com/xyzblocks/feature-toggle-nodejs.git
cd feature-toggle-nodejs
docker build --no-cache -t feature-toggle-nodejs .
docker run -d --name feature-toggle-nodejs -p 8083:8080 -e "AUDIENCE=SJytKyPQ5eiPtmIrxdmFmun3JKtXmkAR" -e "AUTHORITY=https://xyzblocks.auth0.com" -e "CONNECTION_STRING=" -e "HOST=0.0.0.0"  feature-toggle-nodejs
cd ..
