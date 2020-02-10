import React from 'react';

export function isDevelopment() {
  return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
}

function DevelopmentOnly(props) {
  if (isDevelopment()) {
    return (
      props.children
    )
  }
  else {
    return null
  }
}

export default DevelopmentOnly
