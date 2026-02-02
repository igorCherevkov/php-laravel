FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-interaction --optimize-autoloader

RUN php artisan key:generate

CMD sh -c "\
    echo 'Waiting for MySQL...'; \
    until php -r \"new PDO('mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'), getenv('DB_USERNAME'), getenv('DB_PASSWORD'));\" >/dev/null 2>&1; do sleep 2; done; \
    echo 'MySQL is up, running migrations...'; \
    php artisan migrate --force; \
    php artisan db:seed --force; \
    echo 'Starting PHP-FPM'; \
    php-fpm \
"
