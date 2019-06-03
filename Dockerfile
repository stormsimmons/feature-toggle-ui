FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -y git

RUN apt-get install -y curl

WORKDIR /usr/src/app

RUN git clone https://github.com/xyzblocks/feature-toggle-ui.git .

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

RUN cp -r dist/feature-toggle-ui/. /usr/share/nginx/html
