import { render, screen } from '@testing-library/react';
import App from './App';
import {Generator} from "./generator";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('receiving data', done => {

  const generator = new Generator();
  generator.getSensorDataA(300);
  generator.sensorA$
      .subscribe(data => {
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done();
      });
});

test('set no data after 1300', done => {
    const generator = new Generator();
    generator.getSensorDataA(1400);

    setTimeout(() => {
        done();
    }, 1300);
    generator.sensorA$
        .subscribe(() => {
            throw new Error('"no data" was not installed');
        });
});
