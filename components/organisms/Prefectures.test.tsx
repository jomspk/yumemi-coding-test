import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import Prefectures from './Prefectures';

describe('Prefectureコンポーネントのテスト', () => {
  const mockData = [
    {
      prefCode: 1,
      prefName: '北海道',
    },
  ];
  const handleClick = jest.fn();
  it('正しくレンダリングされる', () => {
    //Arrange
    render(<Prefectures prefectures={mockData} onChange={handleClick} />);

    //Assert
    expect(screen.getByRole('checkbox', { name: mockData.prefName })).toBeInTheDocument();
  });

  it('チェックボックスをチェックを入れたときの挙動', async () => {
    //Arrange
    render(<Prefectures prefectures={mockData} onChange={handleClick} />);

    //Act
    const checkbox = screen.getByRole('checkbox', { name: mockData.prefName });
    fireEvent.click(checkbox);

    //Assert
    expect(handleClick).toHaveBeenCalledWith('北海道', 1, true);
  });

  it('チェックボックスをチェックを外したときの挙動', async () => {
    //Arrange
    render(<Prefectures prefectures={mockData} onChange={handleClick} />);

    //Act
    const checkbox = screen.getByRole('checkbox', { name: mockData.prefName });
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    //Assert
    expect(handleClick).toHaveBeenCalledWith('北海道', 1, false);
  });
});
