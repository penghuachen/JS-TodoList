
// index: 使陣列中的資料位置與 DOM 的節點位置同步，刪除、選取才不會有問題
// id: 資料的唯一性，目前用於判斷狀態切換時，同步更新當前狀態陣列、更新原陣列
// JSON.parse(localStorage.getItem('saveTaskList')) ||
const taskListAry =  JSON.parse(localStorage.getItem('saveTaskList')) || [];
let inProgressAry = [];
let finishedAry = [];
let taskObj = {};
let currentStatus = '全部';
let text;
taskList(taskListAry);
addListenerToTask();

document.querySelector('.plus').addEventListener('click', clickToAddTask);
function clickToAddTask(e) {
  addTask();
  addListenerToTask();
}

document.querySelector('.input-task input').addEventListener('keypress', keyupToAddTask);

function keyupToAddTask(e) {
  if(e.keyCode === 13) {
    addTask();
    addListenerToTask();
  }
}

// 每次重新建立 DOM 物件時替 DOM 元素掛上監聽事件
function addListenerToTask() {
  // console.log('add listener');
  let deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach(icon => icon.addEventListener('click', deleteTask));

  let undones = document.querySelectorAll('.undone');
  undones.forEach(undone => undone.addEventListener('click', completeTask));

  let dones = document.querySelectorAll('.done');
  dones.forEach(done => done.addEventListener('click', cancelCompletedTask));

  let taskContent = document.querySelectorAll('.task-content');
  taskContent.forEach(content => content.addEventListener('dblclick', editTaskContent));

  let editTask = document.querySelectorAll('.editTask');
  editTask.forEach(edit => edit.addEventListener('keyup', updateTaskContent));
  editTask.forEach(edit => edit.addEventListener('blur', updateTaskContent));

}

function addTask(e) {
  // console.log('add');
  let inputTask = document.querySelector('.input-task input').value;
  if(inputTask === '') return;
  taskObj = {
    id: String(taskListAry.length),
    done: false,
    task: inputTask,
  };
  taskListAry.push(taskObj);
  localStorage.setItem('saveTaskList', JSON.stringify(taskListAry));
  filterTasks(currentStatus);
  document.querySelector('.input-task input').value = '';
}

function deleteTask(e) {
  // console.log('delete');
  let taskId = e.currentTarget.parentNode.getAttribute('data-num');
  let id = e.currentTarget.parentNode.getAttribute('id');
  if(currentStatus === '全部') {
    taskListAry.splice(taskId, 1);
  }
  if(currentStatus === '進行中') {
    // 取得原陣列與目前點擊比對相符的物件，更新原陣列的狀態。
    taskListAry.forEach((task, index) => {
      if(task.id === id) {
        taskListAry.splice(index, 1);
      }
    })
  }
  if(currentStatus === '已完成') {
    taskListAry.forEach((task, index) => {
      if(task.id === id) {
        taskListAry.splice(index, 1);
      }
    })
  }
  localStorage.setItem('saveTaskList', JSON.stringify(taskListAry));
  filterTasks(currentStatus);
}

document.querySelector('.refresh').addEventListener('click', deleteAllTasks);
function deleteAllTasks(e) {
  // console.log('refresh');
  if(taskListAry.length === 0) {
    return alert('目前沒有任何待辦事項');
  }

  let deleteChecked = confirm('你確定要刪除全部待辦事項嗎?');
  if(deleteChecked) {
    // console.log('confirm');

    alert('成功刪除所有待辦事項');
    taskListAry.splice(0);
    taskList(taskListAry);
    localStorage.setItem('saveTaskList',JSON.stringify(taskListAry));
  }
  else {
    console.log('alert2');
    alert('取消刪除所有待辦事項');
  }
}

function completeTask(e) {
  filterTasks(currentStatus);
  // console.log(e.currentTarget.parentNode);
  let undone = e.currentTarget;
  let done = e.currentTarget.parentNode.children[1];
  let taskId = e.currentTarget.parentNode.getAttribute('data-num');
  let id = e.currentTarget.parentNode.getAttribute('id');
  let currentTaskContent = e.currentTarget.parentNode.children[2];

  if(currentStatus === '全部') {
    taskListAry[taskId].done = true; 
  }
  if(currentStatus === '進行中') {
    // 取得原陣列與目前點擊比對相符的物件，更新原陣列的狀態。
    taskListAry.forEach(task => {
      if(task.id === id) {
        task.done = true;
      }
    })
    inProgressAry[taskId].done = true;
  }
  if(currentStatus === '已完成') {
    taskListAry.forEach(task => {
      if(task.id === id) {
        task.done = true;
      }
    })
    finishedAry[taskId].done = true;
  }
  undone.style.display = 'none';
  done.style.display = 'block';
  currentTaskContent.classList.add('line-through');
  localStorage.setItem('saveTaskList',JSON.stringify(taskListAry));
  filterTasks(currentStatus);
}

function cancelCompletedTask(e) {
  filterTasks(currentStatus);
  let done = e.currentTarget;
  let undone = e.currentTarget.parentNode.children[0];
  let taskId = e.currentTarget.parentNode.getAttribute('data-num');
  let currentTaskContent = e.currentTarget.parentNode.children[2];
  let id = e.currentTarget.parentNode.getAttribute('id');
  // 更新資料狀態
  if(currentStatus === '全部') {
    taskListAry[taskId].done = false; 
  }
  if(currentStatus === '進行中') {
    // 在進行中時切換任務狀態，同時更新原陣列、當前陣列中物件的狀態
    taskListAry.forEach(task => {
      if(task.id === id) {
        task.done = false;
      }
    })
    inProgressAry[taskId].done = false;
  }
  if(currentStatus === '已完成') {
    taskListAry.forEach(task => {
      if(task.id === id) {
        task.done = false;
      }
    })
    finishedAry[taskId].done = false;
  }
  undone.style.display = 'block';
  done.style.display = 'none';
  currentTaskContent.classList.remove('line-through');
  localStorage.setItem('saveTaskList',JSON.stringify(taskListAry));
  filterTasks(currentStatus);
}

function editTaskContent(e) { 
  // console.log('editTaskContent');
  // console.log(e.currentTarget.children);
  const text = e.currentTarget.children[0];
  const input = e.currentTarget.children[1];
  text.style.display = "none";
  input.style.display = "block";
  input.value = text.textContent;
}

function updateTaskContent(e) {
  // console.log('update');

  if(e.keyCode === 13 || e.type === 'blur') {
    const previousElement = e.currentTarget.previousElementSibling;
    const input = e.currentTarget;
    let newValue = e.currentTarget.value;
    previousElement.textContent = newValue;
    const taskId = e.currentTarget.parentNode.parentNode.getAttribute('data-num');
    let id = e.currentTarget.parentNode.parentNode.getAttribute('id');
    // 更新資料狀態
    if(currentStatus === '全部') {
      taskListAry[taskId].task = newValue; 
    }
    if(currentStatus === '進行中') {
      // 在進行中時切換任務狀態，同時更新原陣列、當前陣列中物件的狀態
      taskListAry.forEach(task => {
        if(task.id === id) {
          task.task = newValue;
        }
      })
      inProgressAry[taskId].task = newValue;
    }
    if(currentStatus === '已完成') {
      taskListAry.forEach(task => {
        if(task.id === id) {
          task.task = newValue;
        }
      })
      finishedAry[taskId].task = newValue;
    }
    previousElement.style.display = "block";
    input.style.display = "none";
  }
}

document.querySelector('.task-status').addEventListener('click', changeStatus);
function changeStatus(e) {
  document.querySelectorAll('.task-status p').forEach(status => status.classList.remove('current'));
  e.target.classList.add('current');
  currentStatus = e.target.textContent;
  filterTasks(currentStatus);
}
// 勾選任務狀態後，重新渲染該狀態時的畫面
function filterTasks(currentStatus) { 
  // console.log(currentStatus);
  if(currentStatus === '全部') {
    taskList(taskListAry);
  }
  if(currentStatus === '進行中') {
    inProgressAry = taskListAry.filter(task => task.done === false);
    taskList(inProgressAry);
  }
  if(currentStatus === '已完成') {
    finishedAry = taskListAry.filter(task => task.done === true);
    taskList(finishedAry);
  }
  addListenerToTask();
}



// 任務列表畫面
function taskList(tasksAry) {
  const taskListView = document.querySelector('.task-list');
  taskListView.innerHTML = tasksAry.map((obj, index) => {
    // 透過模板字串搭配三元運算子動態修改css display / class 的值
    
    let checkTaskDone = `
      <div data-testid="undone" class="undone" style="display: ${ !obj.done ? 'block' : 'none' };"></div>
      <div data-testid="done" class="done" style="display: ${ !obj.done ? 'none' : 'block'};">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
          </path>
        </svg>
      </div>
      <div data-testid="task-content" class="task-content ${ obj.done ? 'line-through' : '' }">
        <p>${ obj.task }</p>
        <input data-testid="editTask" type="text" class="editTask" style="display: none;">
      </div>
    `;
    let dom = `
      <div class="task" id="${ obj.id }" data-num="${ index }">
        ${ checkTaskDone }
        <div data-testid="delete-icon" class="delete-icon">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
            </path>
          </svg>
        </div> 
      </div>
    `;
    // !index && console.log(dom);
    return dom;
  }).join('');
}


// 取得日期
(function getDate() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
  let currentDay = new Date().getDay();
  let currentMonth = new Date().getMonth();
  let currentDate = new Date().getDate();

  let dom = `${ days[currentDay] }, ${ months[currentMonth].substring(0,3) } ${ currentDate }`;
  document.querySelector('.date').innerHTML = dom;
})();
