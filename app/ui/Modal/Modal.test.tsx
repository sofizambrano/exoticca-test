import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        Content
      </Modal>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Content
      </Modal>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('closes when the close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('close'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('closes when the Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Content
      </Modal>
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalled();
  });
});
