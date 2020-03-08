const { fireEvent, getByTestId, getAllByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom');

describe('測試能否正常修改待辦事項', () => {
  describe('測試透過 Enter 鍵修改待辦事項', () => {
    test('測試函式: editTaskContent, updateTaskContent', () => {
      // Arrange 
      const container = document.body;
      localStorage.setItem('storeTodoTasksList',JSON.stringify([{
        id: 0,
        done: false,
        task: 'this is a test.',
      }])); 
      require('../../js/todo');

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
      const container = document.body;
      localStorage.setItem('storeTodoTasksList',JSON.stringify([{
        id: 0,
        done: false,
        task: 'this is a test.',
      }])); 
      
      require('../../js/todo');

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
