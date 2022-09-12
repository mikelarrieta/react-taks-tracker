import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { createTask, deleteTask, getTasks, toggleReminder } from './services/TasksService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setTasks(await getTasks());
    }
    fetchTasks();
  }, []);

  async function handleAddTask(task) {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function handleToggleReminder(id) {
    const updatedTask = await toggleReminder(id);
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: updatedTask.reminder } : task));
  }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask} />

        <Route
          path='/'
          exact
          render={() => (
            <>
              {showAddTask && <AddTask onAdd={handleAddTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleReminder} />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
