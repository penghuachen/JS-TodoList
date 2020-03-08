const { fireEvent, getByTestId, getAllByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom')

describe('測試能否修改待辦事項的狀態', () => {
  // 安裝 jest-dom 測試此部分: 是否有符合需求的 css style
  describe('測試未完成勾選為完成', () => {
    test('測試函式: completeTask', () => {
      // Arrange 
      const container = document.body;
      localStorage.setItem('storeTodoTasksList',JSON.stringify([{
        id: 0,
        done: false,
        task: 'this is a test.',
      }]));  
      require('../../js/todo');

      // Act
      const undone = getAllByTestId(container, 'undone');
      fireEvent.click(undone[0]);
      
      // Assert
      expect(
        getByTestId(document.documentElement, 'done')
      ).toBeInTheDocument();
    });
  })
  describe('測試完成勾選為未完成', () => {
    test('測試函式: cancelCompletedTask', () => {
      // Arrange 
      const container = document.body;
      localStorage.setItem('storeTodoTasksList',JSON.stringify([{
        id: 0,
        done: true,
        task: 'this is a test.',
      }]));  
      require('../../js/todo');

      // Act
      const done = getAllByTestId(container, 'done');
      fireEvent.click(done[0]);
      
      // Assert
      expect(
        getByTestId(document.documentElement, 'undone')
      ).toBeInTheDocument();;
    });
  })
});