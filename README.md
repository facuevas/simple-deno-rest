# A simple TODO-List REST API using Deno and Oak
A simple TODO/Grocery list using the deno package library.
Oak and deno STD libraries were used.
Oak: https://deno.land/x/oak
Deno Standard Library: https://deno.land/std

## USAGE:
Use "deno --allow-read --allow-net server.ts" to execute the server.
Use postman to test out API endpoints.

## API ENDPOINTS
GET /api/items - Returns all items
GET /api/items/:id - Returns one item with a given id
POST /api/items - Adds an item to the list
PUT /api/items/:id - Updates the item with a given id
DELETE /api/items/:id - Deletes the item with a given id
