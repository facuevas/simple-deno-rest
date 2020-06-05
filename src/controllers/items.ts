import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Item } from '../types.ts';


// list of groceries
let groceries: Item[] = [
    {
        id: "1",
        name: "Tomatoes",
        completed: false
    },
    {
        id: "2",
        name: "Bananas",
        completed: false
    },
    {
        id:  "3",
        name: "Milk",
        completed: false
    }
];

// @description:    Returns all items
// @route:          GET /api/items
const getItems = ({ response }: { response: any} ) => {
    response.body = {
        success: true,
        data: groceries
    }
};

// @description:    Returns one items
// @route:          GET /api/items/:id
const getItem = ({ params, response }: { params: {id: string}, response: any} ) => {
    const item: Item | undefined = groceries.find(itm => itm.id === params.id);

    if (item) {
        response.status = 200; // return OK status
        response.body = {
            success: true,
            data: item
        }
    }
    else {
        response.status = 404; // return NOT FOUND status
        response.body = {
            success: false,
            message: "Item was not found"
        }
    }
};

// @description:    Adds an item to our lost
// @route:          POST /api/items
const addItem = async ({ request, response }: { request: any, response: any} ) => {
    const body = await request.body();

    // if request does not contain a body, return bad request status
    if (!request.hasBody) {
        request.status = 400; // return BAD REQUEST status
        response.body = {
            success: false,
            message: "No data to be added"
        }
    }
    // else add the item if a request contains a body
    else {
        const item: Item = {
           name: body.value.name,
           completed: Boolean(body.value.completed),
           id: v4.generate()
        };
        groceries.push(item);
        response.status = 200; // return OK status
        response.body = {
            success: true,
            data: item,
            message: "Item successfully added"
        }

    }
};

// @description:    Updates an item from our list
// @route:          PUT /api/items/:id
const updateItem = async ({ params, request, response }: { params: { id: string}, request: any, response: any} ) => {
    const item: Item | undefined = groceries.find(itm => itm.id === params.id);

    if (item) {
        const body = await request.body();
        body.value.completed = Boolean(body.value.completed);
        const updateItem: { name?: string, completed?: string} = body.value;
        groceries = groceries.map(itm => itm.id === params.id ? {...itm, ...updateItem} : itm);
        response.status = 200; // return OK
        response.body = {
            success: true,
            data: updateItem,
            message: "Item successfulled updated"
        }
    }
    else {
        response.status = 404;
        response.body = {
            success: false,
            message: "Item not found"
        }
    }
};

// @description:    Deletes an item from our list
// @route:          DELETE /api/items/:id
const deleteItem = ({ params, response }: { params: { id: string }, response: any} ) => {
    groceries = groceries.filter(itm => itm.id !== params.id);
    response.body = {
        success: true,
        data: groceries,
        message: "Item successfully deleted"
    }
}

export { getItems, getItem, addItem, deleteItem, updateItem };