export async function markTodoAsCompleted(id) {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to mark todo as completed');
    }

    const data = await response.json();
    console.log('Todo marked as completed:', data);
  } catch (error) {
    console.error('Error:', error.message || 'An unknown error occurred');
  }
}
