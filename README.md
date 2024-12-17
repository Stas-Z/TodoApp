# TodoApp

## Описание

TodoApp — это FullStack приложение для управления заметками и делами, с возможностью регистрации пользователей. Проект состоит из фронтенда и бекенда, с использованием современных технологий для удобства и эффективности.

## Технологии

### Фронтенд

- **React**
- **TypeScript**
- **Redux Toolkit** (включая EntityAdapter для нормализации списков)
- **Ant Design**
- **Webpack**
- Lazy загрузка страниц через `React.lazy`
- Применяется методология **Feature-Sliced Design** для структурирования кода.

### Бэкенд

- **Node.js**
- **Express**
- **MongoDB**

### Дополнительно

- Линтеры обеспечивают качество и согласованность кода.

## Оптимизация

Для повышения производительности и улучшения пользовательского опыта в проекте применены следующие подходы:

- **EntityAdapter** из Redux Toolkit позволяет эффективно управлять состоянием списков данных, нормализуя их структуру. Это улучшает производительность при работе с большими наборами данных, так как обеспечивает более быстрый доступ к элементам по их идентификаторам.

- **React.lazy** используется для ленивой загрузки страниц и компонентов. Это позволяет загружать только те части приложения, которые необходимы в данный момент, снижая объем первоначальной загрузки и ускоряя время отображения контента.

## Установка

1. Установите зависимости для проекта:

    ```bash
    npm install
    ```

2. Добавьте файл `config.env` с переменными окружения в папку `server/config`:

    `server/config/config.env`

    Пример содержимого `config.env`:

    ```env
    SECRET_KEY= "секретный ключ"
    DB_URL= "ссылка на базу данных MongoDb"
    ```

3. Запустите приложение:

    ```bash
    npm run start
    ```

## Онлайн версия

Вы также можете протестировать приложение онлайн! Приложение доступно по ссылке [www.todoapp.openblogapp.ru](https://todoapp.openblogapp.ru)

## Возможности

- Регистрация пользователей
- Создание, редактирование и удаление заметок
- Просмотр списка дел с нормализованной структурой
- Современный дизайн интерфейса с использованием Ant Design
