import { render, screen } from '@testing-library/react';
import App from './App';

// Test generado por Create React App, nunca reemplazado por uno real de
// este proyecto — busca un link "learn react" que no existe en esta app,
// así que falla si se corre. La cobertura real de UI está en
// playwright-e2e/, no acá.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
