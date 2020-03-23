# univ

A simple "_Universal JavaScript_" application example using **Fastify** and **React**.

It is built to showcase the following principles:

- Universal module loading
- Universal rendering
- Universal routing
- Universal Data fetching

**It does not use webpack or babel on the server side and fully leverages Node.js ESM modules support!**

## Usage

_You will need Node version >13_

```bash
npm run build
npm start
```

Then point your browser to [localhost:3000](http://localhost:3000/).

## Frontend only development

```bash
npm run dev:ui
```

Will start a `webpack-dev-server` session on [localhost:8080](http://localhost:8080/).
