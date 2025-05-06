import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type todolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ]
  });



  function removeTask(todolistId: string, id: string) {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }

  function addTask(todolistId: string, title: string) {
    const newTask = { id: v1(), title: title, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    // let task = { id: v1(), title: title, isDone: false };
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
  }

  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    // let task = tasks.find(t => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    // }

    // setTasks([...tasks]);
  }


  // let tasksForTodolist = tasks;

  // if (filter === "active") {
  //   tasksForTodolist = tasks.filter(t => t.isDone === false);
  // }
  // if (filter === "completed") {
  //   tasksForTodolist = tasks.filter(t => t.isDone === true);
  // }

  // function changeFilter(value: FilterValuesType) {
  //   setTodolists(value)
  // }


  return (
    <div className="App">
      {todolists.map((t) => {

        let tasksForTodolist = tasks[t.id];
        if (t.filter === "active") {
          tasksForTodolist = tasks[t.id].filter(y => y.isDone === false);
        }
        if (t.filter === "completed") {
          tasksForTodolist = tasks[t.id].filter(y => y.isDone === true);
        }

        function changeFilter(todolistId: string, value: FilterValuesType) {
          setTodolists(todolists.map(filtered => filtered.id === todolistId ? {...filtered, filter: value} : filtered))
        }

        return (
          <Todolist
            key={t.id}
            todolistId={t.id}
            title={t.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={t.filter}
          />
        )
      })}
    </div>
  );
}
