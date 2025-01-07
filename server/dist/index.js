"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const client = new pg_1.Client(process.env.DATABASE_URL);
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const signupQuery = 'insert into users (username,password) values ($1,$2);';
        yield client.query(signupQuery, [username, password]);
        const response = yield client.query('select id from users where username = $1', [username]);
        res.json({ id: response.rows[0].id });
    }
    catch (e) {
        res.send('Error signing up');
    }
}));
app.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, title, desc } = req.body;
        const createQuery = 'insert into todos (user_id,title,description) values ($1,$2,$3)';
        yield client.query(createQuery, [user_id, title, desc]);
        res.send('Todo created successfully');
    }
    catch (e) {
        console.log(e);
        res.send('Todo cannot be created');
    }
}));
app.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.query.user_id;
        const getQuery = 'select id,title,description from todos where user_id = $1';
        const response = yield client.query(getQuery, [user_id]);
        res.send(response.rows);
    }
    catch (e) {
        res.send('Cannot get todos');
    }
}));
app.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todo_id } = req.body;
        const deleteQuery = 'delete from todos where id = $1';
        const response = yield client.query(deleteQuery, [todo_id]);
        if (response.rowCount && response.rowCount > 0)
            res.send('Todo deleted successfully');
        else
            res.send('Not todo found to be deleted');
    }
    catch (e) {
        res.send('Todo cannot be deleted');
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        app.listen(process.env.PORT, () => {
            console.log('Running on port 3000');
        });
    });
}
main();
