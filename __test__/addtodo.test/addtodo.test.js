const { fireEvent, getByTestId, getAllByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom');

describe('測試能否正常新增待辦事項', () => {
  describe('測試透過 plus 圖示新增任務', () => {
    test('測試函式: addTask', () => {
      // Arrange

    
      const container = document.body;
      let inputTask = getByTestId(container, 'input');
      const plus = getByTestId(container, 'plus');
      require('../../js/todo');

      // Act
      inputTask.value = 'First task';
      fireEvent.click(plus);

      const firstTaskContent = getByTestId(container, 'task-list').children[0].textContent;
    
      // Jest matcher for string
      // Assert
      expect(firstTaskContent).toMatch(/First task/);
    });
  });
  describe('測試點擊 Enter 鍵新增任務', () => {
    test('測試函式: addTask', () => {
      // Arrange 
      const container = document.body;
      let inputTask = getByTestId(container, 'input');
      require('../../js/todo');

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
