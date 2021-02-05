import { render, screen } from '@testing-library/react';
import Loader from '../../components/Loader';

test('renders learn react link', () => {
  render(<Loader />);
  const spanElement = screen.getByText(/Loading.../i);
  expect(spanElement).toBeInTheDocument();
});
