FROM nginx:latest
COPY ./AllMoviesApp /usr/share/nginx/html
EXPOSE 80