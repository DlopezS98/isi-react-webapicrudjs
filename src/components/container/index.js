import React from 'react';

export default function Container(props) {
  return <div className={`container ${props.className}`}>{props.children}</div>;
}
