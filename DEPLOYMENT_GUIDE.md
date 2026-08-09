# Инструкция по деплою и развертыванию на GitHub Pages

## Почему возникала ошибка пуша?
В GitHub действует строгое правило безопасности: для любых изменений в папке `.github/workflows/` требуются специальные права `workflows`. Поскольку у интеграции Google AI Studio этих прав нет, любое присутствие файлов в папке `.github/` блокировало запуск и пуш.

Мы полностью удалили папку `.github`, и теперь ваш проект **успешно запушится на GitHub**!

---

## Вариант 1: Запуск GitHub Pages (Без файлов .yml — Самый простой способ)

1. Зайдите в ваш репозиторий на **GitHub**.
2. Перейдите во вкладку **Settings** (Настройки) -> **Pages**.
3. В разделе **Build and deployment**:
   - **Source**: Выберите `Deploy from a branch`.
   - Выберите ветку `main` (или `master`) и нажмите **Save**.

---

## Вариант 2: Добавление файла deploy.yml вручную на GitHub (Автоматическая сборка Vite)

Если вам нужен автоматический деплой сборки Vite через GitHub Actions, создайте файл прямо в интерфейсе GitHub:

1. Откройте ваш репозиторий на **GitHub**.
2. Нажмите **Add file** -> **Create new file**.
3. Назовите файл с путем: `.github/workflows/deploy.yml`
4. Вставьте следующий код:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build static site
        run: npx vite build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Нажмите **Commit changes**.
6. Готово! Теперь при каждом пуше сайт будет автоматически собираться и публиковаться.
