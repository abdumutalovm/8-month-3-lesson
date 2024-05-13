import { FC, useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";

interface TodoProps {
  data: {
    name: string;
    time: number;
    id: number;
    status: boolean;
  }[];
}

const Todo: FC<TodoProps> = ({ data }) => {
  const [todos, setTodos] = useState(data);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: e.target.checked,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEdit = (id: number) => {
    const newTodoName = prompt("Enter the new todo name:");

    if (!newTodoName) {
      alert("Todo name cannot be empty!");
      return;
    }
    const currentTime = Date.now();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          name: newTodoName,
          time: currentTime,
        };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTodos(updatedTodos);
  };

  return (
    <div className="bg-[#ECEDF6] rounded-xl px-8 flex flex-col gap-5 items-center justify-between py-8 mt-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex px-5 py-5 rounded-lg bg-white items-center justify-between w-full"
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={todo.status}
              className="checkbox w-11  checkbox-lg"
              onChange={(e) => handleCheckboxChange(e, todo.id)}
            />
            <div>
              <h1 className="text-xl tracking-[2px]">{todo.name}</h1>
              <time>{new Date(todo.time).toLocaleString()}</time>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl block bg-[#ECEDF6] p-3 rounded-lg text-[#585858] transition hover:opacity-80 cursor-pointer">
              <IoMdTrash onClick={() => handleDelete(todo.id)} />
            </span>
            <span className="text-3xl block bg-[#ECEDF6] p-3 rounded-lg text-[#585858] transition hover:opacity-80 cursor-pointer">
              <MdModeEditOutline onClick={() => handleEdit(todo.id)} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
