//const taskManager = require('./taskManager.js')
// const TaskManager = taskManager.TaskManager
//import TaskManager from './taskManager.js'

const createTaskHTML = (name,detailedDescription,assignedTo,dueDate,id) => {
 
  const html = `
    <div class="row">  
        <div class="col-lg-6">
            <h4 class="card-title" id ="taskListCard">Task List</h4>
            <div class="card mb-4" id ="taskListCard" taskid = ${id}> 
                <div class="card-body cardone">
                    <ul class="list-group  list-group-flush">
                        <li class="list-group-item cardA">Name: ${name}</li>
                        <li class="list-group-item cardA">Discription:${detailedDescription}</li>
                        <li class="list-group-item cardA">Assigned To: ${assignedTo}</li>
                        <li class="list-group-item cardA">Date: ${dueDate}</li>           
                    </ul>
                    <br>
                </div>
            </div>
            </div>
            
            </div>
            <button type="button" class="done-button">Success</button>
        `;
        return html;
};

// const taskList=document.getElementById("taskLists")

//***************************************************** */
class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentId = 0;
  }

  addTask(name, detailedDescription, assignedTo, dueDate) {
    const newTask = {
      name: name,
      detailedDescription: detailedDescription,
      assignedTo: assignedTo,
      dueDate: dueDate,
      id: this.currentId,
    };

    this.tasks.push(newTask);
    this.currentId++;
  }
  getTaskById(taskid) {
    let foundTask;
    for (let i=0; i<this.tasks.length; i++) {
    let task = this.tasks[i];
      if (task.id=== taskid)  {
        foundTask=task;
      }
    }
    return foundTask;
    }


  validFormFieldInput(taskName) {
    console.log("name: " + taskName);
  }

  render() {
    const tasksHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {
      let newTaskHTML = createTaskHTML(
        this.tasks[i].name,
        this.tasks[i].detailedDescription,
        this.tasks[i].assignedTo,
        this.tasks[i].dueDate,
        this.tasks[i].status
      );
      tasksHtmlList.push(newTaskHTML);
    }
    // console.log(this.tasks);
    //To display on the web page
    const tasksLists = document.getElementById("tasksLists");
    tasksLists.innerHTML = tasksHtmlList.join("\n");
  }
}

let tm = new TaskManager();
console.log(tm.tasks);

newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();
  //Select the inputs

  const newTaskForm = document.querySelector("#newTaskForm");
  const taskName = document.querySelector("#name").value;
  const detailedDescription = document.querySelector(
    "#detailedDescription"
  ).value;
  const taskAssignedTo = document.querySelector("#assignedTo").value;
  const taskDueDate = document.querySelector("#date").value;
  const errorMessage = document.querySelector("#error");

  let msg = [];
  if (taskName === "" || taskName == null) {
    msg.push("Task name is required");
  }
  if (detailedDescription === "" || detailedDescription == null) {
    msg.push("Detailed description is required");
  }
  if (taskAssignedTo === "" || taskAssignedTo == null) {
    msg.push("Task assigned to is required field");
  }
  if (taskDueDate === "" || taskDueDate == String) {
    msg.push("Due date is required");
  }
  if (msg.length > 0) {
    errorMessage.innerText = msg.join(" ,");
  } 
  else {
    tm.addTask(taskName, detailedDescription, taskAssignedTo, taskDueDate);
    tm.render();

    document.getElementById("newTaskForm").reset();
    errorMessage.innerText = "";
  }

 
});


// Select the Tasks List
const taskList = document.querySelector('#tasksLists');

// Add an 'onclick' event listener to the Tasks List
taskList.addEventListener('click', (event) => {
    // Check if a "Mark As Done" button was clicked
    if (event.target.classList.contains('done-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskid);

        // Get the task from the TaskManager using the taskId
        const task = tm.getTaskById(taskid);

        // Update the task status to 'DONE'
        task.status = 'DONE';

        // Render the tasks
        tm.render();
    }
});


