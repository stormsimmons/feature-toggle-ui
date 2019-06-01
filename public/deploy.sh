git clone https://github.com/xyzblocks/xyzblocks.dev.git

cd xyzblocks.dev

docker build --no-cache -t xyzblocks-dev .

docker run -d --name xyzblocks-dev -p 8081:80 xyzblocks-dev

sudo letsencrypt certonly --standalone --email xyzblocks@gmail.com -d foggle.io
