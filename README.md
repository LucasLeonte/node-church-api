# node-church-api

Backend Node Project

## Structure

node-api/
├─ src/
│ ├─ app.js # App setup (Express, middleware)
│ ├─ server.js # Server bootstrap
│ │
│ ├─ config/
│ │ ├─ database.js # DB connection (Knex / Sequelize / Prisma)
│ │ └─ env.js # Environment variables
│ │
│ ├─ routes/
│ │ ├─ index.js # Route aggregator
│ │ ├─ auth.routes.js
│ │ ├─ users.routes.js
│ │ ├─ faqs.routes.js
│ │ ├─ categories.routes.js
│ │ ├─ programs.routes.js
│ │ ├─ news.routes.js
│ │ ├─ friends.routes.js
│ │ └─ contact.routes.js
│ │
│ ├─ controllers/
│ │ ├─ auth.controller.js
│ │ ├─ users.controller.js
│ │ ├─ faqs.controller.js
│ │ ├─ categories.controller.js
│ │ ├─ programs.controller.js
│ │ ├─ news.controller.js
│ │ ├─ friends.controller.js
│ │ └─ contact.controller.js
│ │
│ ├─ services/
│ │ ├─ auth.service.js
│ │ ├─ users.service.js
│ │ ├─ faqs.service.js
│ │ ├─ programs.service.js
│ │ └─ news.service.js
│ │
│ ├─ models/
│ │ ├─ user.model.js
│ │ ├─ faq.model.js
│ │ ├─ category.model.js
│ │ ├─ program.model.js
│ │ ├─ news.model.js
│ │ ├─ friend.model.js
│ │ └─ contactMessage.model.js
│ │
│ ├─ middlewares/
│ │ ├─ auth.middleware.js
│ │ ├─ role.middleware.js
│ │ └─ validation.middleware.js
│ │
│ ├─ validators/
│ │ ├─ auth.schema.js
│ │ ├─ faq.schema.js
│ │ └─ user.schema.js
│ │
│ ├─ db/
│ │ ├─ migrations/ # Same schema as Laravel migrations
│ │ └─ seeds/
│ │
│ ├─ utils/
│ │ ├─ errors.js
│ │ └─ response.js
│ │
│ └─ docs/
│ └─ openapi.yaml # API contract
│
├─ tests/
│ ├─ integration/
│ └─ unit/
│
├─ .env
├─ .env.example
├─ package.json
├─ README.md
