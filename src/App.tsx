import { useEffect, useRef, useState } from "react";
import Todo from "./components/Todo";

function App() {
  const todoRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    if (storedData) {
      setData(JSON.parse(storedData));
      setFilteredData(JSON.parse(storedData));
    }
  }, []);

  function handleSave() {
    const newTodo = {
      name: todoRef.current?.value,
      time: new Date(),
      id: Date.now(),
      status: false,
    };

    const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const updatedTodos = [...existingTodos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setData(updatedTodos);
    setFilteredData(updatedTodos);
  }

  const handleFilter = (status: string) => {
    let filteredTodos = [];
    if (status === "All") {
      filteredTodos = data;
    } else {
      const isCompleted = status === "Checked" ? true : false;
      filteredTodos = data.filter((todo) => todo.status === isCompleted);
    }
    setFilteredData(filteredTodos);
  };

  return (
    <div className="max-w-[1200px] w-full p-3 mx-auto mt-5">
      <h1 className="text-6xl text-center text-[#636580] font-bold">
        TODO LIST
      </h1>
      <div className="w-full mt-16">
        <div>
          <header className="flex items-center gap-4 justify-between">
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="transition bg-[#6370F0] px-10 rounded-lg py-4 text-2xl text-white font-semibold hover:opacity-80"
            >
              Add Task
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <input
                  type="text"
                  className="input w-full mt-2"
                  ref={todoRef}
                />
                <div className="modal-action">
                  <form method="dialog">
                    <button onClick={handleSave} className="btn btn-neutral">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            <select
              className="select px- w-[230px] h-[70px] text-2xl text-[#666668] bg-[#CCCDDF] border-0 font-semibold select-bordered"
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Checked">Checked</option>
              <option value="Unchecked">Unchecked</option>
            </select>
          </header>
        </div>
      </div>
      <Todo data={filteredData} />
    </div>
  );
}

export default App;
