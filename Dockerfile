FROM nginx

WORKDIR /usr/src/app

RUN git clone https://github.com/xyzblocks/feature-toggle-ui.git .

RUN curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

COPY dist/feature-toggle-ui /usr/share/nginx/html
