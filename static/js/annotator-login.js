const login = (ev) => {
  task_id = document.querySelector('#task_id').value;
  if (task_id) {
    fetch('/api/tasks/' + task_id + '/')
        .then(response => response.json())
        .then(data => {
          window.location.href = "/annotator-task/#" + task_id;
        })
        .catch(error => {
          document.querySelector('#error').classList.remove("hide");
        });
  }
}

document.querySelector('#start').onclick = login;
