const { fireEvent, getByTestId, getAllByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom')

describe('測試能否切換任務狀態區域', () => {
  describe('全部切換至進行中', () => {
    test('測試函式: changeStatus', () => {
      // Arrange 
      const container = document.body;
      let taskStatus = getAllByTestId(container, 'task-status');
      require('../../js/todo');

      // Act
      fireEvent.click(taskStatus[0]);
      fireEvent.click(taskStatus[1]);
      
      // Assert
      expect(taskStatus[1]).toHaveClass("current");

    });
  })
  describe('進行中切換至已完成', () => {
    test('測試函式: changeStatus', () => {
      // Arrange 
      const container = document.body;
      let taskStatus = getAllByTestId(container, 'task-status');
      require('../../js/todo');

      // Act
      fireEvent.click(taskStatus[1]);
      fireEvent.click(taskStatus[2]);
      
      // Assert
      expect(taskStatus[2]).toHaveClass("current");

    });
  })
  describe('全部切換至已完成', () => {
    test('測試函式: changeStatus', () => {
      // Arrange 
      const container = document.body;
      let taskStatus = getAllByTestId(container, 'task-status');
      require('../../js/todo');

      // Act
      fireEvent.click(taskStatus[0]);
      fireEvent.click(taskStatus[2]);
      // Assert
      expect(taskStatus[2]).toHaveClass("current");

    });
  })
});