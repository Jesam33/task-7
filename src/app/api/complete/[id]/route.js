async function markTodoAsCompleted(id) {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
  });

  const data = await response.json();
  if (response.status === 200) {
    console.log('Todo marked as completed:', data);
  } else {
    console.error('Error:', data.message);
  }
}
