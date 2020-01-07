
// 每次都要重新定義資料的id，並讓id與陣列長度為同步狀態，刪除、選取才不會有問題
const taskListAry = [];
const tempObj = {
  taskMessage: '',
};
let taskObj = {};

document.querySelector('.input-task input').addEventListener('change', getTaskMessage);
function getTaskMessage(e) {
  tempObj.taskMessage = e.target.value;
}

document.querySelector('.plus').addEventListener('click', addTask);
function addTask(e) {
  taskObj = {
    id: taskListAry.length,
    done: false,
    task: tempObj.taskMessage
  }
  taskListAry.push(taskObj);
  taskList();
}

// 任務列表畫面
function taskList() {
  const content = document.querySelector('.content');
  let totalTasks = '';
  if(taskListAry.length === 0) return;
  taskListAry.forEach(obj => {
  let dom = `
    <div class="task">
    <div class="undone"></div>
    <div class="done"">
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
  });
  content.innerHTML = totalTasks; 
}