import React, { useRef } from 'react';

export const useRenderCounter = () => {
  const renderCountRef = useRef(0);

  const increaseFn = () => {
    renderCountRef.current += 1;
  };

  return [renderCountRef, increaseFn];
};

const RenderCounter = ({ className }) => {
  const [renderCount, increaseFn] = useRenderCounter();
  increaseFn();

  return (
    <></>
  );
};

export default RenderCounter;
