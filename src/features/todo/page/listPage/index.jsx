import React, { useEffect } from "react";
import TodoList from "../../component/todoList";
import { useState } from "react";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import TodoFrom from "../../component/TodoFrom";
export default function ListPage(props) {
  const inittodoList = [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "Code",
      status: "new",
    },
  ];
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const [todolist, setTodoList] = useState(inittodoList); // dung de thay doi state
  const [filterState, setFilterState] = useState(() => {
    const params = queryString.parse(location.search); //lay url param tren thanh search
    console.log(params); // ?status=new
    return params.status || "all";
  });

  useEffect(() => {
    const params = queryString.parse(location.search); //lay url param tren thanh search
    setFilterState(params.status || "all");
  }, [location.search]); //thay doi state khi URL params thay doi

  const handleTodoClick = (todo, index) => {
    //toggle state
    const newToDoList = [...todolist];
    newToDoList[index] = {
      ...newToDoList[index],
      status: newToDoList[index].status === "new" ? "completed" : "new",
    };
    setTodoList(newToDoList);
    console.log(todo, index);
  };
  const handleShowAllClick = () => {
    // setFilterState("all");
    const queryParams = { status: "all" };
    history.push({
      //di den duong dan
      pathname: match.path, //truyen path cua tg Cha len param
      search: queryString.stringify(queryParams), // truyen status:all lam url parms
    });
  };
  const handleShowCompletedClick = () => {
    // setFilterState("completed");
    const queryParams = { status: "completed" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowNewClick = () => {
    //setFilterState("new");
    const queryParams = { status: "new" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const renderTodoList = todolist.filter(
    (todo) => filterState === "all" || filterState === todo.status
  );
  console.log(renderTodoList);
  const handleTodoFormSubmit = (values) => {
    //them title trong form vao2 state todoList
    console.log("from submit", values);
    const newTodo = {
      id: todolist.length + 1,
      title: values.title,
      status: "new",
    };
    const newTodoList = [...todolist, newTodo];
    setTodoList(newTodoList);
  };
  return (
    <div>
      <h3> What to do</h3>
      <TodoFrom onSubmit={handleTodoFormSubmit} />
      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={handleShowAllClick}> Show all</button>
        <button onClick={handleShowCompletedClick}> Show Completed</button>
        <button onClick={handleShowNewClick}> Showw new</button>
      </div>
    </div>
  );
}
