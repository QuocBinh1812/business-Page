// rfcp        
import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss';
import classnames from 'classnames'; //npm i --save classnames

function TodoList(props) {
    const {todoList,onTodoClick} = props;
    const handleTodoClick = (todo,index)=> {
        if (!onTodoClick)return;
        onTodoClick(todo,index);
            
        
    }

    return (
        <ul className="todo-list">
            {todoList.map((todo,index) =>(
                <li className={classnames({
                    "todo-item":true,
                    completed:todo.status==="completed"})} 
                key={todo.id}
                onClick={()=>handleTodoClick(todo,index)}>
                {todo.title}</li>
            ))};
        </ul>
        
    )
}

TodoList.propTypes = {
    todoList:PropTypes.array,        // khai bao kieu cua prop
    onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
    todoList:[],
    onTodoClick:null,
}; //mac dinh ko co props truyen vao thi se la mang rong

export default TodoList

