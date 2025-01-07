import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function getTodos(){
    const response = await axios.get('http://localhost:3000/get',{
        params:{
            user_id: localStorage.getItem('userId')
        }
    })
    return response.data;
}

async function createTodo(data: any){
    console.log(data);
    const response  = await axios.post('http://localhost:3000/create',data);
    return response.data;
}

async function signup(data: any){
    const response  = await axios.post('http://localhost:3000/signup',data);
    console.log(response.data);
    if(response.data.id){
        localStorage.setItem('userId',response.data.id);
    }
    return response.data;
}

async function deleteAPI(todo_id: any){
   return await axios.delete('http://localhost:3000/delete', {
        data: {
            todo_id
        }
    })
}

export function useDelete(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo_id: any) => deleteAPI(todo_id),
        onSuccess: () => {
            alert('todo deleted successfully')
        },
        onError: () => {
            alert('error deleting todo');
        },
        onSettled: async (_,error) => {
            if(error) console.log(error);
            return await queryClient.invalidateQueries({queryKey: ['todos']});
        }
    })
}

export function useTodos(){
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })
}


export function useCreateTodo(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => createTodo(data),
        onSuccess: () => {
            console.log('Todo created successfully')
        },
        onError: () => {
            console.log('Error creating Todo');
        },
        onSettled: async (_,error) => {
            if(error) console.log(error);
            else await queryClient.invalidateQueries({queryKey: ['todos']});
        }
    })
}


export function useSignup(){
    return useMutation({
        mutationFn: (data: any) => signup(data),
        onSuccess: () => {
            alert('Signed up successfully')
        },
        onError: () => {
            alert('Error signing up');
        }
    })
}