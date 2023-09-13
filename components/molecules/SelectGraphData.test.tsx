import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectGraphData from './SelectGraphData';

describe('SelectGraphDataコンポーネントのテスト', () => {
  it('正しくレンダリングされる', () => {
    // Arrange
    const handleClick = jest.fn();
    render(<SelectGraphData selectData={handleClick} />);

    //  Assert
    expect(screen.getByRole('option', { name: '総人口' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '若年人口' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '生産年齢人口' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '老年人口' })).toBeInTheDocument();
  });

  it('正しく選択できる', async () => {
    // Arrange
    const handleClick = jest.fn();
    render(<SelectGraphData selectData={handleClick} />);

    //  Act
    await userEvent.selectOptions(screen.getByRole('combobox'), '若年人口');

    //  Assert
    expect(screen.getByRole('option', { name: '総人口' }).selected).toBe(false);
    expect(screen.getByRole('option', { name: '若年人口' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: '生産年齢人口' }).selected).toBe(false);
    expect(screen.getByRole('option', { name: '老年人口' }).selected).toBe(false);
  });

  it('クリック時にonClickイベントハンドラがトリガーされる', () => {
    //  Arrange
    const handleClick = jest.fn();
    render(<SelectGraphData selectData={handleClick} />);

    //  Act
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'youthPopulation' } });

    //  Assert
    expect(handleClick).toHaveBeenCalled();
  });
});
