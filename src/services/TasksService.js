export async function getTasks() {
  const res = await fetch('http://localhost:5000/tasks');
  return await res.json();
}

export async function getTask(id) {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  return await res.json();
}

export async function createTask(task) {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  });
  return await res.json();
}

export async function deleteTask(id) {
  return await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  });
}

export async function toggleReminder(id) {
  const taskToToggle = await getTask(id);
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  });
  return await res.json();
}
