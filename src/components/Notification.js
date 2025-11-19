import React, { useEffect, useState } from 'react';

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`notification ${type} ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;