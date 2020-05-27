import React from 'react';

const NewDataFetchJsonComponent = (props) => {
  const CustomTag = `${props.type}`;
  let myElement;

  if(typeof props.onChange === 'function'){
    myElement = () => {
      return (<CustomTag value={props.inputFields.content}
      name={props.inputFields.names.divIdFetch} readOnly ></CustomTag>);

    }
  } else {
    myElement = () => {return (<CustomTag id={props.inputFields.names.divIdFetch} ></CustomTag>);}
  }

  return (<>{myElement()}</>)
}

export default NewDataFetchJsonComponent;
