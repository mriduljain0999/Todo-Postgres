import { useRef } from "react";
import { useCreateTodo, useDelete, useTodos } from "./queries"

export function Landing(){
    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLInputElement>(null)
    const createQuery = useCreateTodo();
    const deleteQuery = useDelete();

    const todos: any = useTodos();
    if(todos.isPending){
        return <div>loading...</div>
    }
    if(todos.isError){
        return <div>Error getting todo</div>
    }

    function create(){
        const data = {
            user_id: localStorage.getItem('userId'),
            title: titleRef.current?.value,
            desc: descRef.current?.value,
        }
        createQuery.mutate(data);
    }

    function deleteTodo(){
        // @ts-ignore
        const todoId = document.querySelector(".todoId")?.innerHTML;
        deleteQuery.mutate(todoId)
    }
    return <div>
        <input ref={titleRef} type="text" placeholder="title" />
        <input ref={descRef} type="text" placeholder="description" />
        <button onClick={create}>{createQuery.isPending ? 'Adding todo..' : 'Add Todo' }</button>
        {todos.data.map((todo: any) => {
            return <div style={{display:"flex", gap: "20px"}} key={todo.id}>
                <p className="todoId">{todo.id}</p>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
                <button onClick={deleteTodo}>Delete Todo</button>
            </div>
        })}
    </div>
}