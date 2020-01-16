export function create(todo) {
    return fetch('/api/todos', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(todo)
    }).then(res => res.json());
}

export function getAll() {
    return fetch('/api/todos')
    .then(res => res.json());
}

export function deleteOne(id) {
    return fetch(`${'/api/todos'}/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
}

export function update(todo) {
    return fetch(`${'/api/todos'}/${todo._id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(todo)
    }).then(res => res.json());
}