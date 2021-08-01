//const taskManager = require('./taskManager.js')
// const TaskManager = taskManager.TaskManager
//import TaskManager from './taskManager.js'

const createTaskHTML = (
  name,
  detailedDescription,
  assignedTo,
  dueDate,
  status
) => {
  const html = `
    <div class="row">  
        <div class="col-lg-6">
            <h4 class="card-title" id ="taskListCard">Task List</h4>
            <div class="card mb-4" id ="taskListCard"> 
                <div class="card-body cardone" id "inputAll">
                    <ul class="list-group  list-group-flush" id "inputAll">
                        <li class="list-group-item cardA">Name: ${name}</li>
                        <li class="list-group-item cardA">Discription:${detailedDescription}</li>
                        <li class="list-group-item cardA">Assigned To: ${assignedTo}</li>
                        <li class="list-group-item cardA">Date: ${dueDate}</li>           
                    </ul>
                    <br>
                    <div>
                        <label for="toDo">Choose status:</label>
                        <select name="status" id="status">
                        <option value="done">Done</option>
                        <option value="Inprogress">In Progress</option>
                        <option value="delete">Delete</option>
                        </select>
                    </div>
                </div>
            
            </div>
            </div>
        </div>
    </div> 
    `;
  return html;
};

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
    const displayHere = document.getElementById("displayHere");
    displayHere.innerHTML = tasksHtmlList.join("\n");
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
    msg.push("Task name is Required");
  }
  if (detailedDescription === "" || detailedDescription == null) {
    msg.push("DetailedDescription is Required");
  }
  if (taskAssignedTo === "" || taskAssignedTo == null) {
    msg.push("TaskAssignedTo is Required");
  }
  if (taskDueDate === "" || taskDueDate == String) {
    msg.push("Wrong Input");
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

// //edit form

// function editForm(index) {
//     var formhtml = document.getElementById('user');
//     userhtml.innerHTML = '';
//     for(var i=o i <URLSearchParams.length,i++){
//         if(i ==index){
//             userhtml.innerHTML += `div class = "red">
//             NAME: <input id="inputName" required type = 'text' placeholder = "${users[i].name}"> <br></br>`
//         } else {
//             userhtml.innerHTML += `div class = "black" <p> NAME: ${users[i].name} `
//         }
//     }
// }
