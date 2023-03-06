import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const element = screen.getByText('Internet, web & online services');

    expect(element).toBeInTheDocument();
  });
});
