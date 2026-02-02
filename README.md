# 1. Запуск проекта

## Клонирование

```
git clone https://github.com/igorCherevkov/analytics-bot.git
cd analytics-bot
```

## Настройка переменных окружения

```
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Запуск (команды для миграций и сидеров включены в Dockerfile)

docker-compose up --build -d

## Доступ к приложениям

- Frontend (React): http://localhost:3000
- Backend API (Laravel): http://localhost:8081/api

# 2. Ключевые компоненты

## Frontend компоненты:

- frontend/src/pages/ArticlesPage.tsx - Главная страница со списком статей и пагинацией
- frontend/src/pages/ArticlePage.tsx - Детальная страница статьи с комментариями
- frontend/src/components/ArticleItem.tsx - Карточка статьи для отображения в списке
- frontend/src/components/CommentsList.tsx - Отображение списка комментариев
- frontend/src/components/CommentForm.tsx - Форма для добавления нового комментария

## Backend компоненты:

- backend/app/Http/Controllers/ArticlesController.php - Обработка всех запросов к статьям
- backend/app/Http/Controllers/CommentsController.php - Обработка запросов к комментариям
- backend/app/Models/Article.php и Comment.php модели - Работа с данными
- backend/app/Providers/RouteServiceProvider.php + backend/routes/api.php - Регистрация API маршрутов
- backend/routes/articles.php - Регистрация маршрутов для статей
- backend/routes/comments.php - Регистрация маршрутов для комментариев

# 3. API Endpoints структура

- GET http://localhost:8081/api/articles - Просмотр списка статей
- GET http://localhost:8081/api/articles/{id} - Просмотр одной статьи
- POST http://localhost:8081/api/articles - Добавление статьи
- POST http://localhost:8081/api/articles/{id}/comments - Добавление комментария к статье
