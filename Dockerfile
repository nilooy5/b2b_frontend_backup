FROM nginx:1.17.1-alpine
COPY /dist/browser /usr/share/nginx/html
COPY /nginx/vhosts.conf /etc/nginx/conf.d/default.conf