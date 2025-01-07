import express from 'express';
import cors from 'cors';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new Client(process.env.DATABASE_URL);

app.post('/signup', async (req,res) => {
    try{
        const { username, password } = req.body;
        const signupQuery = 'insert into users (username,password) values ($1,$2);'
        await client.query(signupQuery,[username,password])
        const response  = await client.query('select id from users where username = $1' , [username]);

        res.json({id:response.rows[0].id});
    }catch(e: any){
        res.send('Error signing up');
    }

})

app.post('/create' , async (req,res) => {
    try{
        const {user_id ,title , desc} = req.body;
        const createQuery = 'insert into todos (user_id,title,description) values ($1,$2,$3)'
        await client.query(createQuery,[user_id,title,desc])
        res.send('Todo created successfully');
    }catch(e){
        console.log(e);
        res.send('Todo cannot be created');
    }
}) 

app.get('/get', async (req,res) => {
    try{
        const user_id = req.query.user_id;
        const getQuery = 'select id,title,description from todos where user_id = $1'
        const response = await client.query(getQuery,[user_id]);
        res.send(response.rows);
    }catch(e){
        res.send('Cannot get todos');
    }
})

app.delete('/delete',async (req,res) => {
    try{
        const {todo_id} = req.body;
        const deleteQuery = 'delete from todos where id = $1'
        const response = await client.query(deleteQuery,[todo_id]);
        if(response.rowCount && response.rowCount > 0) res.send('Todo deleted successfully');
        else res.send('Not todo found to be deleted');
    }catch(e){
        res.send('Todo cannot be deleted');
    }
})

async function main(){
    await client.connect();
    app.listen(process.env.PORT,() => {
        console.log('Running on port 3000');
    });
}

main();