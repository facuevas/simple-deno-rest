import { Application } from 'https://deno.land/x/oak/mod.ts'; // oak library for our rest calls
import router from './routes.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts'; // .env config library


const port = Number(config().PORT);

// Create new application.
const app = new Application();

// Middlewares
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Running on http://localhost:${port}/`);

await app.listen({ port });