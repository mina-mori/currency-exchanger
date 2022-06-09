import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('simple test case', () => {
  render(<App />);
  expect(true).toBe(true);
});
