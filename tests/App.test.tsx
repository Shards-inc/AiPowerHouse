import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('AiPowerHouse')).toBeInTheDocument();
    expect(screen.getByText('Multi-model Command Center')).toBeInTheDocument();
  });

  it('renders model roster', () => {
    render(<App />);
    expect(screen.getByText('ChatGPT')).toBeInTheDocument();
    expect(screen.getByText('Claude')).toBeInTheDocument();
  });
});
