const { fireEvent, getByTestId, getAllByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom');

describe('測試能否正常刪除待辦事項', () => {
  test('測試函式: deleteTask', () => {
    // Arrange 
    const container = document.body;
    localStorage.setItem('storeTodoTasksList',JSON.stringify([{
      id: new Date().getTime(),
      done: false,
      edit: false,
      task: 'this is a test.',
    }])); 
    require('../../js/todo');

    // Act
    const deleteTask = getAllByTestId(container, 'delete-icon');
    fireEvent.click(deleteTask[0]);
    const checkTaskDelete = getByTestId(container, 'task-list').innerHTML;

    // Assert
    expect(checkTaskDelete).toBe("");  
  });
});