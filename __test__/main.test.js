require('./dom/fakeDom');

describe('測試 todoList 功能', () => {
  beforeEach(() => {
    jest.resetModules();
  })

  afterEach(() => {
    localStorage.setItem('storeTodoTasksList', '[]');
  })

  require('../__test__/addtodo.test.js/addtodo.test');
  require('../__test__/deleteTask/ deleteTask.test');
  require('../__test__/deleteAllTask/deleteAllTasks.test');
  require('../__test__/editTask/editTask.test'); 
  require('../__test__/taskStatus/taskStatus.test');
  require('../__test__/changeTaskArea/changeTaskArea.test');
})