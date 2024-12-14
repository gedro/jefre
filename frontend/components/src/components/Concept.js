import React from 'react';

export default function Concept({ classes, item, removeItem }) {

  return (
    <div>
      <span>{item.title}</span>
      <button onClick={() => removeItem(item)} type="button">X</button>
    </div>
  );
};