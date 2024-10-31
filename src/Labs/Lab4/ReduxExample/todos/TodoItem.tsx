import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item d-flex align-items-center">
      <span className="container">{todo.title}</span>
      <button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click" 
      className="mx-1 btn btn-primary">
        Edit
      </button>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
        className="btn btn-danger"
      >
        Delete
      </button>
    </li>
  );
}
