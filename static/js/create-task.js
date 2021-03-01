const createTask = (ev) => {
    const data = {
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
    };
    fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(showConfirmation);

    // this line overrides the default form functionality:
    ev.preventDefault();
};

document.querySelector('#save').onclick = createPost;
