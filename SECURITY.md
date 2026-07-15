# Защита сайта перед публикацией

В проекте уже включены защитные HTTP-заголовки, CSP, отключение `X-Powered-By`, серверная проверка формы, ограничение размера запроса, проверка Origin/Sec-Fetch-Site, honeypot, временная ловушка и лимит запросов к `/api/contact`.

## Обязательная защита инфраструктуры

Защита от распределённых DDoS-атак не может быть обеспечена только кодом Next.js. Перед публикацией:

1. Разместите домен за CDN/WAF (например, Cloudflare или аналогичным сервисом) и запретите прямой доступ к origin-серверу извне.
2. Включите managed WAF rules, DDoS protection, bot protection и rate limiting для `/api/contact`.
3. Ограничьте запросы к `/api/contact` примерно до 5 отправок за 10 минут на IP и общий поток запросов на уровне CDN.
4. При самостоятельном хостинге используйте reverse proxy. Основа конфигурации находится в `deploy/nginx.conf.example`.
5. Разрешите входящие соединения к origin-серверу только с IP-диапазонов CDN или балансировщика. Включайте `TRUST_PROXY_HEADERS=true` только когда прокси гарантированно перезаписывает клиентские IP-заголовки.
6. Настройте автоматические обновления безопасности, мониторинг доступности, журналирование без персональных данных и оповещения о всплесках 4xx/5xx.

## Переменные окружения

Для рабочей доставки заявок настройте один из вариантов:

```env
# Допустимые публичные origin через запятую
TRUST_PROXY_HEADERS=true
ALLOWED_ORIGINS=https://example.ru,https://www.example.ru

# Вариант 1: ваш защищённый webhook / CRM
CONTACT_WEBHOOK_URL=https://crm.example.ru/hooks/contact
CONTACT_WEBHOOK_TOKEN=replace-with-long-random-secret

# Вариант 2: Telegram Bot API
TELEGRAM_BOT_TOKEN=replace-with-bot-token
TELEGRAM_CHAT_ID=replace-with-chat-id
```

В production без настроенного способа доставки API возвращает ошибку вместо ложного сообщения об успешной отправке.

## Регулярная проверка

Перед каждым релизом запускайте:

```bash
npm ci
npm audit
npm run typecheck
npm run build
```

Не храните токены, пароли и `.env` в Git.
