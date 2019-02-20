import React from 'react';
import ReactDOM from 'react-dom';
import Book from './book';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Book />, div);
  ReactDOM.unmountComponentAtNode(div);
});
