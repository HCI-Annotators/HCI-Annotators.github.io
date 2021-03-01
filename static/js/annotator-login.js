const login = (ev) => {
  task_id = document.querySelector('#task_id').value;
  window.location.href = "/annotator-task/#" + task_id;
}

document.querySelector('#start').onclick = login;
