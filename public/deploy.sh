git clone https://github.com/xyzblocks/feature-toggle-ui.git

cd feature-toggle-ui/public

docker build --no-cache -t foggle-io .

docker run -d --name foggle-io -p 8081:80 foggle-io

sudo letsencrypt certonly --standalone --email xyzblocks@gmail.com -d foggle.io
