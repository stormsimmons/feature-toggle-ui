FROM nginx

RUN apt-get install git

WORKDIR /usr/src/app

RUN git clone https://github.com/xyzblocks/feature-toggle-ui.git .

RUN cp -r public/. /usr/share/nginx/html
