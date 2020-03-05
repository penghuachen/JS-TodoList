
const { fireEvent, getByTestId, getAllByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom');

describe('測試 todoList 功能', () => {
  beforeEach(() => {
    jest.resetModules();
  })

  afterEach(() => {
    localStorage.setItem('saveTaskList', '[]');
  })

  describe('測試能否正常新增待辦事項', () => {
    describe('測試透過 plus 圖示新增任務', () => {
      test('測試函式: addTask', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p class="doing-task">進行中</p>
              <p class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
          </div>
          <div data-testid="plus" class="plus">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
              </path>
            </svg>
          </div>
          <div class="input-task">
            <input type="text" placeholder="Add a to-do" data-testid="input">
          </div>
        `;
      
        const container = document.body;
        let inputTask = getByTestId(container, 'input');
        const plus = getByTestId(container, 'plus');
        require('../js/todo');
  
        // Act
        inputTask.value = 'First task';
        fireEvent.click(plus);

        // console.log('node',global.localStorage);
        // console.log('web',localStorage);
        const firstTaskContent = getByTestId(container, 'task-list').children[0].textContent;
      
        // Jest matcher for string
        // Assert
        expect(firstTaskContent).toMatch(/First task/);
      });
    });
    describe('測試點擊 Enter 鍵新增任務', () => {
      test('測試函式: addTask', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p class="doing-task">進行中</p>
              <p class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
          </div>
          <div data-testid="plus" class="plus">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
              </path>
            </svg>
          </div>
          <div class="input-task">
            <input type="text" placeholder="Add a to-do" data-testid="input">
          </div>
        `;
      
        const container = document.body;
        let inputTask = getByTestId(container, 'input');
        require('../js/todo');
  
        // Act
        inputTask.value = 'First task';
        fireEvent.keyPress(inputTask, { key: 'Enter', keyCode: 13,});
    
        const firstTaskContent = getByTestId(container, 'task-list').children[0].textContent;
      
        // Jest matcher for string
        // Assert
        expect(firstTaskContent).toMatch(/First task/);
      });
    })

  });

  describe('測試能否正常刪除待辦事項', () => {
    test('測試函式: deleteTask', () => {
      // Arrange 

      document.body.innerHTML = `
        <div class="header">
          <svg class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
            </path>
          </svg>
          <p class="date"></p>
        </div>
        <div class="content">
          <div class="task-status">
            <p class="all-task current">全部</p>
            <p class="doing-task">進行中</p>
            <p class="finished-task">已完成</p>
          </div>
          <div data-testid="task-list" class="task-list">
            
          </div>
          <div data-testid="plus" class="plus">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
              </path>
            </svg>
          </div>
          <div class="input-task">
            <input type="text" placeholder="Add a to-do" data-testid="input">
          </div>
        </div>
      `;
      
      const container = document.body;
      localStorage.setItem('saveTaskList',JSON.stringify([{
        id: 0,
        done: false,
        task: 'this is a test.',
      }])); 
      require('../js/todo');

      // Act
      const deleteTask = getAllByTestId(container, 'delete-icon');
      fireEvent.click(deleteTask[0]);

      const checkTaskDelete = getByTestId(container, 'task-list').innerHTML;
  
      // Assert
      expect(checkTaskDelete).toBe("");  
    });
  });

  describe('測試能否正常修改待辦事項', () => {
    describe('測試透過 Enter 鍵修改待辦事項', () => {
      test('測試函式: editTaskContent, updateTaskContent', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p class="doing-task">進行中</p>
              <p class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
            <div data-testid="plus" class="plus">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                </path>
              </svg>
            </div>
            <div class="input-task">
              <input type="text" placeholder="Add a to-do" data-testid="input">
            </div>
          </div>
        `;

        const container = document.body;
        localStorage.setItem('saveTaskList',JSON.stringify([{
          id: 0,
          done: false,
          task: 'this is a test.',
        }])); 
        require('../js/todo');

        // Act
        const taskContent = getAllByTestId(container, 'task-content');
        fireEvent.dblClick(taskContent[0]);
  
        const editTask = getAllByTestId(container, 'editTask');
        editTask[0].value = 'Second task';
        fireEvent.keyUp(editTask[0], { key: 'Enter', keyCode: 13,});
  
        const secondTaskContent = getByTestId(container, 'task-list').children[0].textContent;
        
        // Assert
        expect(secondTaskContent).toMatch(/Second task/);
      });
    });
    describe('測試透過 blur 事件修改待辦事項', () => {
      test('測試函式: editTaskContent, updateTaskContent', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p class="doing-task">進行中</p>
              <p class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
            <div data-testid="plus" class="plus">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                </path>
              </svg>
            </div>
            <div class="input-task">
              <input type="text" placeholder="Add a to-do" data-testid="input">
            </div>
          </div>
        `;
        const container = document.body;
        localStorage.setItem('saveTaskList',JSON.stringify([{
          id: 0,
          done: false,
          task: 'this is a test.',
        }])); 
        
        require('../js/todo');

        // Act
        const taskContent = getAllByTestId(container, 'task-content');
        fireEvent.dblClick(taskContent[0]);
  
        const editTask = getAllByTestId(container, 'editTask');
        editTask[0].value = 'Second task';
        fireEvent.blur(editTask[0]);
  
        const secondTaskContent = getByTestId(container, 'task-list').children[0].textContent;
        
        // Assert
        expect(secondTaskContent).toMatch(/Second task/);
      });
    });

  });

  describe('測試能否一次刪除全部待辦事項', () => {
    test('測試函式: deleteAllTasks', () => {
      // Arrange 
      document.body.innerHTML = `
        <div class="header">
          <svg data-testid="refresh" class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
            </path>
          </svg>
          <p class="date"></p>
        </div>
        <div class="content">
          <div class="task-status">
            <p class="all-task current">全部</p>
            <p class="doing-task">進行中</p>
            <p class="finished-task">已完成</p>
          </div>
          <div data-testid="task-list" class="task-list"></div>
          <div data-testid="plus" class="plus">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
              </path>
            </svg>
          </div>
          <div class="input-task">
            <input type="text" placeholder="Add a to-do" data-testid="input">
          </div>
        </div>
      `;
  
      const container = document.body;
      const refresh = getByTestId(container, 'refresh');
      window.alert = jest.fn()
      window.confirm = jest.fn(() => true)
      localStorage.setItem('saveTaskList',JSON.stringify([
        {
          id: 0,
          done: false,
          task: 'this is a test.',
        },
        {
          id: 1,
          done: false,
          task: 'this is a test2.',
        }
      ])); 
      require('../js/todo');

      // Act
      fireEvent.click(refresh);
      const checkTaskAllDelete = getByTestId(container, 'task-list').innerHTML;

      // Assert
      expect(checkTaskAllDelete).toBe("");
    });
  });

  describe('測試能否修改待辦事項', () => {
    // 安裝 jest-dom 測試此部分: 是否有符合需求的 css style
    describe('測試未完成勾選為完成', () => {
      test('測試函式: completeTask', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg data-testid="refresh" class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p class="doing-task">進行中</p>
              <p class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
            <div data-testid="plus" class="plus">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                </path>
              </svg>
            </div>
            <div class="input-task">
              <input type="text" placeholder="Add a to-do" data-testid="input">
            </div>
          </div>
        `;
    
        const container = document.body;
        localStorage.setItem('saveTaskList',JSON.stringify([{
          id: 0,
          done: false,
          task: 'this is a test.',
        }]));  
        require('../js/todo');
  
        // Act
        const undone = getAllByTestId(container, 'undone');
        fireEvent.click(undone[0]);
        
        // Assert
        expect(undone[0]).toHaveStyle("display: none");
      });
    })
    describe('測試完成勾選為未完成', () => {
      test('測試函式: cancelCompletedTask', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg data-testid="refresh" class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p class="doing-task">進行中</p>
              <p class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
            <div data-testid="plus" class="plus">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                </path>
              </svg>
            </div>
            <div class="input-task">
              <input type="text" placeholder="Add a to-do" data-testid="input">
            </div>
          </div>
        `;
    
        const container = document.body;
        localStorage.setItem('saveTaskList',JSON.stringify([{
          id: 0,
          done: false,
          task: 'this is a test.',
        }]));  
        require('../js/todo');
  
        // Act
        const undone = getAllByTestId(container, 'undone');
        fireEvent.click(undone[0]);
        const done = getAllByTestId(container, 'done');
        fireEvent.click(done[0]);
        
        // Assert
        expect(done[0]).toHaveStyle("display: none");

      });
    })
  });

  describe('測試能否切換任務狀態區域', () => {
    describe('全部切換至進行中', () => {
      test('測試函式: changeStatus', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg data-testid="refresh" class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p data-testid="task-status" class="doing-task">進行中</p>
              <p class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
            <div data-testid="plus" class="plus">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                </path>
              </svg>
            </div>
            <div class="input-task">
              <input type="text" placeholder="Add a to-do" data-testid="input">
            </div>
          </div>
        `;
        const container = document.body;
        let taskStatus = getByTestId(container, 'task-status');
        require('../js/todo');
  
        // Act
        fireEvent.click(taskStatus); 
        
        // Assert
        expect(taskStatus).toHaveClass("current");
  
      });
    })
    describe('進行中切換至已完成', () => {
      test('測試函式: changeStatus', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg data-testid="refresh" class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p data-testid="task-status" class="doing-task">進行中</p>
              <p data-testid="task-status" class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
            <div data-testid="plus" class="plus">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                </path>
              </svg>
            </div>
            <div class="input-task">
              <input type="text" placeholder="Add a to-do" data-testid="input">
            </div>
          </div>
        `;
        const container = document.body;
        let taskStatus = getAllByTestId(container, 'task-status');
        require('../js/todo');

        // Act
        fireEvent.click(taskStatus[0]);
        fireEvent.click(taskStatus[1]);
        
        // Assert
        expect(taskStatus[1]).toHaveClass("current");
  
      });
    })
    describe('全部切換至已完成', () => {
      test('測試函式: changeStatus', () => {
        // Arrange 
        document.body.innerHTML = `
          <div class="header">
            <svg data-testid="refresh" class="refresh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z">
              </path>
            </svg>
            <p class="date"></p>
          </div>
          <div class="content">
            <div class="task-status">
              <p class="all-task current">全部</p>
              <p class="doing-task">進行中</p>
              <p data-testid="task-status" class="finished-task">已完成</p>
            </div>
            <div data-testid="task-list" class="task-list"></div>
            <div data-testid="plus" class="plus">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                </path>
              </svg>
            </div>
            <div class="input-task">
              <input type="text" placeholder="Add a to-do" data-testid="input">
            </div>
          </div>
        `;
        const container = document.body;
        let taskStatus = getByTestId(container, 'task-status');
        require('../js/todo');
  
        // Act
        fireEvent.click(taskStatus); 
        
        // Assert
        expect(taskStatus).toHaveClass("current");
  
      });
    })
  });
})