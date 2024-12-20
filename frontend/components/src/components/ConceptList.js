import React from 'react';
import Concept from './Concept';

export default function ConceptList({ classes, items, removeItem, handleItemChange, withRange }) {

  return (
    <div className={classes.com_select_concept_list}>
      {items.map((item) => (
        <Concept key={item.url} classes={classes}
                 item={item} removeItem={removeItem} handleOnChange={handleItemChange} withRange={withRange} />
      ))}
    </div>
  );
};