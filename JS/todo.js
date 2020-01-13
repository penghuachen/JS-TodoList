
// (關鍵)每次都要重新定義資料的id，並讓id與陣列長度為同步狀態，刪除、選取才不會有問題
const taskListAry = [];
// taskList()
let taskObj = {};

document.querySelector('.plus').addEventListener('click', clickToAddTask);
function clickToAddTask(e) {
  addTask();
  addListenerToTask();
}

document.querySelector('input').addEventListener('keyup', keyupToAddTask);
function keyupToAddTask(e) {
  if(e.keyCode === 13) {
    addTask();
    addListenerToTask();
  }
}

function addListenerToTask() {
  let deleteIcons = document.getElementsByClassName('delete-icon');
  Array.from(deleteIcons).forEach(icon => icon.addEventListener('click', deleteTask));

  let undones = document.getElementsByClassName('undone');
  Array.from(undones).forEach(undone => undone.addEventListener('click', completeTask));

  let dones = document.getElementsByClassName('done');
  Array.from(dones).forEach(done => done.addEventListener('click', cancelCompletedTask));
}

function addTask(e) {
  let inputTask = document.querySelector('.input-task input').value;
  if(inputTask === '') return;
  taskObj = {
    done: false,
    task: inputTask,
  }
  taskListAry.push(taskObj);
  taskList();
  document.querySelector('.input-task input').value = '';
}

function deleteTask(e) {
  let taskId = e.currentTarget.parentNode.getAttribute('data-num');
  taskListAry.splice(taskId, 1);
  taskList();
  addListenerToTask();
}

document.querySelector('.refresh').addEventListener('click', deleteAllTasks);
function deleteAllTasks(e) {
  if(taskListAry.length === 0) {
    return alert('目前沒有任何待辦事項');
  }

  let deleteChecked = confirm('你確定要刪除全部待辦事項嗎?');
  if(deleteChecked) {
    alert('成功刪除所有待辦事項');
    taskListAry.splice(0);
    taskList();
  }
  else {
    alert('取消刪除所有待辦事項');
  }
}

function completeTask(e) {
  let undone = e.currentTarget;
  let done = e.currentTarget.parentNode.children[1];
  let currentNode = e.currentTarget.parentNode;
  undone.style.display = 'none';
  done.style.display = 'block';
  currentNode.classList.add('line-through');
}

function cancelCompletedTask(e) {
  let done = e.currentTarget;
  let undone = e.currentTarget.parentNode.children[0];
  let currentNode = e.currentTarget.parentNode;
  undone.style.display = 'block';
  done.style.display = 'none';
  currentNode.classList.remove('line-through');
}

// 任務列表畫面
function taskList() {
  let totalTasks = '';
  const content = document.querySelector('.content');
  // 當 taskListAry 為空時，
  if(taskListAry.length === 0) {
    content.innerHTML = '';
  }
  taskListAry.forEach((obj, index) => {
    let dom = `
      <div class="task" data-num="${ index }">
        <div class="undone"></div>
        <div class="done" style="display: none;">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
            </path>
          </svg>
        </div>
        <p class="task-content">${ obj.task }</p>
        <div class="delete-icon">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
            </path>
          </svg>
        </div> 
      </div>
    `;
    totalTasks += dom;
    content.innerHTML = totalTasks; 
  });
}

// 取得日期
(function getDate() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
  let currentDay = new Date().getDay();
  let currentMonth = new Date().getMonth();
  let currentDate = new Date().getDate();

  let dom = `${ days[currentDay] }, ${ months[currentMonth].substring(0,3) } ${ currentDate }`;
  document.querySelector('.date').innerHTML = dom;
})();