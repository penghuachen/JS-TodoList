
/*
  需要測試 UI 的部分:
  1. 使用者新增任務
  2. 使用者刪除任務
  3. 使用者刪除全部任務
  4. 使用者修改任務
  5. 使用者修改任務狀態(已完成、未完成)
  6. 使用者切換任務狀態區域(全部、進行中、已完成)
*/
/*
  問題集中區:
  1. 目前新增任務時還需要將資料存入 localstorage ，在測試的時候需要拆成 [新增任務] + [存入localstorage]
  還是當作一整個執行流程的行為一併測試呢?
    - 測試 localstorage: https://www.npmjs.com/package/jest-localstorage-mock
  2. 新增任務邏輯是將資料 push 到陣列中，再透過遍歷陣列後將 dom 渲染在畫面上，關於 [將資料 push 到陣列中]
  是否直接 hard code，還是一樣要撰寫呢？
  3. 如果程式碼重複性太高，需要在測試中再寫一次，還是直接 import 該函式，在 require 使用呢(Ex. fn: taskList)?
*/
const { fireEvent, getByTestId } = require('@testing-library/dom');

function taskList(tasksAry) { 
  let totalTasks = '';
  tasksAry.forEach((obj, index) => {
    // 透過模板字串搭配三元運算子動態修改css display / class 的值
    let checkTaskDone = `
      <div data-testid="undone" style="display: ${ !obj.done ? 'block' : 'none' };"></div>
      <div data-testid="done" style="display: ${ !obj.done ? 'none' : 'block'};">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
          </path>
        </svg>
      </div>
      <div data-testid="task-content ${ obj.done ? 'line-through' : '' }">
        <p>${ obj.task }</p>
        <input type="text" data-testid="editTask" style="display: none;">
      </div>
    `;
    let dom = `
      <div class="task" id="${ obj.id }" data-num="${ index }">
        ${ checkTaskDone }
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
  return totalTasks;
}
function addTaskDom() {
  /*
    測試重點: 確定是否可以新增資料，以新增一筆資料為基準
    1. 使用者輸入任務
    2. 資料存於 localstorage
    3. 畫面顯示該任務
  */
  /*
    測試方式：
    1. 使用者輸入任務
      - 給予一組 fake data
    2. 是否成功存於 localstorage (後續在測試)
    3. 畫面顯示該任務
      - 確認是否成功新增該 dom
  */
  const div = document.createElement('DIV');
  let addTaskDom = `
    <div data-testid="plus">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
        </path>
      </svg>
    </div>
    <input type="text" placeholder="Add a to-do" data-testid="input">
  `;

  div.innerHTML = addTaskDom;
  const plus = getByTestId(div, 'plus');
  plus.addEventListener('click', () => {
    let taskListAry = [];
    let inputTask = getByTestId(div, 'input').value;
    inputTask = 'First task';
    if(inputTask === '') return;
    taskObj = {
      id: 0,
      done: false,
      task: inputTask,
    };
    taskListAry.push(taskObj);
    let dom = taskList(taskListAry);
    div.innerHTML = dom;
    return div;
  });
  return div;
}

test('Check task whether add to view or not.', () => {
  const container = addTaskDom();
  const plus = getByTestId(container, 'plus');
  
  fireEvent.click(plus);
  const firstTaskContent = getByTestId(container, 'task-content').textContent;
  // Jest matcher for string
  expect(firstTaskContent).toMatch(/First task/);
})