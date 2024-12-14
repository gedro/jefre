import React from 'react';
import Concept from './Concept';

export default function ConceptList({ classes, items, removeItem }) {

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.url}>
            <Concept key={item.url} item={item} removeItem={removeItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};