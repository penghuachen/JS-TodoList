const { fireEvent, getByTestId, getAllByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom')

describe('測試能否一次刪除全部待辦事項', () => {
  test('測試函式: deleteAllTasks', () => {
    // Arrange 
    const container = document.body;
    const refresh = getByTestId(container, 'refresh');
    window.alert = jest.fn()
    window.confirm = jest.fn(() => true)
    localStorage.setItem('storeTodoTasksList',JSON.stringify([
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
    require('../../js/todo');

    // Act
    fireEvent.click(refresh);
    const checkTaskAllDelete = getByTestId(container, 'task-list').innerHTML;

    // Assert
    expect(checkTaskAllDelete).toBe("");
  });
});