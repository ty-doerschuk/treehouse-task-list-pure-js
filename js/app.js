// Element Selectors and HTML Collection varables
var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0];
var tasksIncompleteHolder = document.getElementById('incomplete-tasks');
var tasksCompletedHolder = document.getElementById('completed-tasks');

// create new task li
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editItem = document.createElement('button');
  var deleteItem = document.createElement('button');

  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editItem.innerText = 'Edit';
  editItem.className = 'edit';
  deleteItem.innerText = 'Delete';
  deleteItem.className = 'delete';
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editItem);
  listItem.appendChild(deleteItem);

  return listItem;
}

// and new task to incomplete HTML collection
var addTask = function() {
  var listItem = createNewTaskElement(taskInput.value);
  tasksIncompleteHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);

  taskInput.value = '';
}

// edit current li task
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var buttonLabel = listItem.querySelector('button')

  var containsClass = listItem.classList.contains('editMode')
  if (containsClass) {
    label.innerText = editInput.value;
    buttonLabel.innerText = 'Edit'
  } else {
    editInput.value = label.innerText;
    buttonLabel.innerText = 'Save'
  }
  listItem.classList.toggle('editMode');
}

// delete li task
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

// add task to completed holder HTML collection
var completeTask = function() {
  var listItem = this.parentNode;
  tasksCompletedHolder.appendChild(listItem);
  bindTaskEvents(listItem, incompleteTask)
}

// add task to incomplete task HTML collection holder
var incompleteTask = function() {
  var listItem = this.parentNode;
  tasksIncompleteHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask)
}

// add event handlers to li buttons
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bindTaskEvents');
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

// functionality for task list 
addButton.addEventListener('click', addTask);

for(var i = 0; i < tasksIncompleteHolder.children.length; i++) {
  bindTaskEvents(tasksIncompleteHolder.children[i], completeTask)
}

for(var i = 0; i < tasksCompletedHolder.children.length; i++) {
  bindTaskEvents(tasksCompletedHolder.children[i], incompleteTask)
}
