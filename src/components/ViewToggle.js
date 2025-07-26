import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleView } from '../app/userSlice';


const ViewToggle = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.users.view);

  return (
    <button onClick={() => dispatch(toggleView())}>
      Switch to {view === 'grid' ? 'List' : 'Grid'} View
    </button>
  );
};

export default ViewToggle;
