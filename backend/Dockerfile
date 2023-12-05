FROM python:3.11.4-alpine
EXPOSE 8000
ARG ENV_FILE
WORKDIR /code

RUN apk update && apk add postgresql-dev git gcc python3-dev musl-dev gettext curl jpeg-dev zlib-dev bash freetype-dev libjpeg-turbo-dev libpng-dev imagemagick imagemagick-dev libpq-dev

ADD requirements.txt /code/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ADD apps /code
COPY .env /code/.env
