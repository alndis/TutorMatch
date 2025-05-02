import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../../components/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    mockOnClose.mockClear();
  });
  
  test('должен отображать переданный контент', () => {
    render(
      <Modal onClose={mockOnClose}>
        <div data-testid="modal-content">Test Content</div>
      </Modal>
    );
    
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  test('должен вызывать onClose при клике на кнопку закрытия', () => {
    render(
      <Modal onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );
    
    fireEvent.click(screen.getByText('✕'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('должен вызывать onClose при клике вне модального окна', async () => {
    render(
      <Modal onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );
    const overlay = document.querySelector('.bg-black.bg-opacity-50');
    expect(overlay).not.toBeNull();

    fireEvent.mouseDown(overlay!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('не должен вызывать onClose при клике внутри модального окна', () => {
    render(
      <Modal onClose={mockOnClose}>
        <div>
          <button>Click me</button>
        </div>
      </Modal>
    );
    
    fireEvent.click(screen.getByText('Click me'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
