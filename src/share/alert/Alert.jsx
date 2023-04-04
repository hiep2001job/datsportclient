import React from 'react';
import { useSelector } from 'react-redux';

function Alert() {
  const { message, type } = useSelector(state => state.alert);

  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}

export default Alert;