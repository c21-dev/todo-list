import { useState } from "react";
import Popup from "./components/Popup/Popup";
import "./App.css";

interface TodoListItem {
  id: number;
  title: string;
  description: string;
}
function App() {
  const [open, setOpen] = useState(false);
  const [todoList, setTodoList] = useState<TodoListItem[]>([
    { id: 1, title: "TESTING", description: "I need to do this" },
  ]);

  const addTodoList = (item: TodoListItem) => {
    todoList.push(item);
    setTodoList(todoList);
  };

  return (
    <>
      <h1>TODO List</h1>
      <div className="card">
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <div>{todo.title}</div>
              <div>{todo.description}</div>
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen(true)}>Add</button>

        <Popup
          open={open}
          title="Create new todo"
          onClose={() => setOpen(false)}
        >
          <div style={{ color: "black" }}>
            asd
            <p>Popup content goes here. Put forms, buttons, whatever.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </Popup>
      </div>
    </>
  );
}

export default App;
