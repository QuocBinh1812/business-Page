import React from 'react'
import TodoList from './component/todoList'
import {useState} from "react";
export default function AlbumFeatures(props) {
    const inittodoList=[
        {
            id:1,
            title: "Eat",
            status:"new"
        },
        {
            id:2,
            title: "Sleep",
            status:"completed"
        },
        {
            id:3,
            title: "Code",
            status:"new"
        },

    ];
    const [todolist,setTodoList]=useState(inittodoList); // dung de thay doi state
    
    return (

        <div>
            <h3> Album List</h3>
            <TodoList />
            <div>
                <button > Show all</button>
                <button > Show Completed</button>
                <button > Showw new</button>
            </div>
        </div>
    )
}
