import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Headerコンポートネントのテスト', () => {
  // Arrange
  it('ヘッダーが正しくレンダリングされる', () => {
    render(<Header />);

    //  Assert
    expect(screen.getByRole('heading', { name: '都道府県別人口推移グラフ' }));
  });
});
