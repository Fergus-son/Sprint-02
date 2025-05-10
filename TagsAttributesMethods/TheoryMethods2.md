# Используемые методы 
delete

# Используемые хуки 
useState

# Важное 

## Ассоциативный массив

  Ассоциативный массив (или словарь, хэш-таблица, map) — это структура данных, которая хранит пары ключ-значение, где каждый ключ уникален и связан с определённым значением.

🔹 Основные характеристики:
- Ключи могут быть любого типа (строки, числа и т. д.), но в некоторых языках есть ограничения.

- Значения могут быть любыми (числа, строки, объекты, другие массивы и т. д.).

- Доступ к элементам осуществляется по ключу, а не по индексу (как в обычных массивах).

- Порядок элементов не гарантируется (зависит от реализации языка).

  Пример:

  <!-- let todolistID1=v1(); --> - ключ
  <!-- let todolistID2=v1(); --> - ключ

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState({
    [todolistID1]:[
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]:[
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });

## key для ассоциативных массивов для точной и корректной работы react

<!-- Где именно прописывается key? -->
- Ключ нужно указывать на верхнем элементе внутри map

#### Фишка 

- Cуть иммутабельности в том, что ты воссоздаешь новый массив для того, чтобы вытаскивать из массива стейта определенные компоненты (например title, filter), чтобы использовать их в функциях

+ 

 <!-- Устанавливаем в state копию объекта, чтобы React отреагировал перерисовкой:  -->
  setTasks({ ...tasks })
 - (копия того же объекта делается и записывается в тот же стейт, чтобы он перерисовывал его, как только вызываемая функция сработает)

##### Cпособ деструктуризации входящих пропсов если это массив для использования в функции :

<!-- TodoListItem.tsx -->

export const TodolistItem = (props: Props) => {
  const {
    todolist: {id, title, filter},
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
  } = props

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
<!-- функция передает id и в данной функции он принимается для того, чтобы react понимал в каком конкретно тудулисте делать перерисовку -->
  }

<Button className={filter === 'all' ? 'active-filter' : ''}
        title={'All'}
        onClick={() => changeFilterHandler('all')}/>


# Работа с массивами внутри объектов 

## Использование массивов внутри объектов в функциях

- Насчёт пропсов в компонентах, там просто добавляется теперь к функциям еще todolist.id, чтобы функция вызываемая из App.tsx знала по отношению конкретно к какой таске будет выполняться функция

### Удаление таски

const deleteTask = (todolistId: string, taskId: string) => {
  setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
}

<!-- setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) }) -->

- todolistId: tasks[todolistId] - берётся конкретный массив задач по id конкретного тудулиста (достается так - ключ: массив)


### Создание таски

const createTask = (todolistId: string, title: string) => {
  const newTask = {id: v1(), title, isDone: false}
  setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
}

- по сути та же история, просто в данном случае нет какого-либо используемого метода и стейт перезаписывается после клика пользователя

- title берется из input event.currentTarget.value

<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<!-- ВАЖЕН ПОРЯДОК ПЕРЕДАВАЕМЫХ ДАННЫХ В CALLBACK-ФУНКЦИЮ -->
<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

### Дополнительная типизация для избежания ошибок внутри BLL

export type TasksState = {
  <!-- [key: string]: Task[] -->
}

- [key: string] - свойства-ключи типа string (ключи в объекте не могут быть другого типа);
- Task[] - значения свойств - это массивы объектов с типом Task.

- Но также для этой задачи подходит утилитный тип Typescript Record (style guide):

export type TasksState = Record<string, Task[]> 



<!-- const [tasks, setTasks] = useState<TasksState>({ -->
  [todolistId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ],
  [todolistId2]: [
    { id: v1(), title: 'Rest API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
})





# Метод delete 

<!-- Для удаления свойства из объекта в JS есть оператор delete -->

const deleteTodolist = (todolistId: string) => {
  setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
  /** Удаляем таски нужного тудулиста из стейта тасок: */
  <!-- delete tasks[todolistId] -->
  /** Устанавливаем в state копию объекта: */
  setTasks({ ...tasks })
}

- В данном случае используется для того, чтобы вместе со всем тудулистом удалялись и его таски 
- Чтобы это увидеть используй react-developer-tools


#### Фишка 

  export type Todolist = {
  id: string
  title: string
  filter: FilterValues
  } 

  const createTodolist = (title: string) => {
    <!-- const newTodolist: Todolist = {id: v1(), title, filter: 'all'} -->
  }

- берётся типизация Todolist в данном случае 


# Новый способ использовать компоненты с пропсами

<!-- App.tsx -->

  return (
    <div className="app">
      <CreateItemForm onCreateItem={createTodolist} />
  )

<!-- TodolisItem.tsx -->

    const createTaskHandler = (title: string) => {
        createTask(todolist.id, title)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }

    return (
        <div>
            <div className="container">
                <h3>{todolist.title}</h3>
                <GlobalButton title="x" onClick={deleteTodolistHandler} />
            </div>
  <CreateItemForm onCreateItem={createTaskHandler} />
    )

- Две разные функции передаются в один общий компонент, выполняющий одни и те же действия для двух разных функций

## Создание новых тудулистов 

- Для того, чтобы всё работало исправно необходимо добавлять пустой массив тасок, так как мы в функции createTodolist создаём только новый объект 

const createTodolist = (title: string) => {
  const todolistId = v1()
  const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
  setTodolists([newTodolist, ...todolists])
  <!-- setTasks({ ...tasks, [todolistId]: [] }) -->
}

# input

## autoFocus

- Используется чтобы при переходе в режим редактирования input курсор появлялся автоматически  

## onBlur

- По сути переход обратно в режим отображения, чтобы на нажатие в другом месте страницы оно обратно превращалось в обычный span

  <input value={value} onBlur={turnOffEditMode} autoFocus />

## value 

- Чтобы менять значение текста, нужно title поместить в useState, для возможности перерисовки (задаем значению title менющиеся занчение value, для возможности работы с value)

export const EditableSpan = ({ value }: Props) => {
  <!-- const [title, setTitle] = useState(value) -->
 
  /*...*/
 
  <!-- const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  } -->
 
  return (
      <>
        {isEditMode ? (
            <!-- <input value={title} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus /> -->
        ) : (
            <span onDoubleClick={turnOnEditMode}>{value}</span>
        )}
      </>
  )
}





# span

## onDoubleClick

- Правильная реализация:

  export const EditableSpan = ({ value }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
 
  const turnOnEditMode = () => {
    setIsEditMode(true)
  }
 
  return (
      <>
        {isEditMode ? (
            <input value={value} autoFocus />
        ) : (
            <span onDoubleClick={turnOnEditMode}>{value}</span>
        )}
      </>
  )
}




friends[3][1]

friends[students[1].id][2]