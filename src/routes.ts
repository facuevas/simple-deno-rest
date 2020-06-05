import { Router } from 'https://deno.land/x/oak/mod.ts'; // Application router
import { getItem, getItems, addItem, updateItem, deleteItem} from './controllers/items.ts';

const router = new Router();

router.get('/api/items', getItems)
        .get('/api/items/:id', getItem)
        .post('/api/items', addItem)
        .put('/api/items/:id', updateItem)
        .delete('/api/items/:id', deleteItem);


export default router;