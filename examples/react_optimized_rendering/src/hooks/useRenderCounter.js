import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export const useRenderCounter = () => {
  const renderCountRef = useRef(0);
  const renderTitleRef = useRef("");
  const renderStyleRef = useRef();

  const increaseFn = () => {
    renderCountRef.current += 1;
  };

  return [renderCountRef, increaseFn];
};

export const RenderCounterDisplay = ({ renderCount, renderTitle, renderStyle }) =>
    <span style={renderStyle} title="Render Counter">
      [{renderTitle}{renderCount.current}]
    </span>

RenderCounterDisplay.propTypes = {
    renderStyle: PropTypes.object,
    renderTitle: PropTypes.string,
    renderCount: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.number }),
    ]),
};

const RenderCounter = ({ className }) => {
  const [renderCount, increaseFn] = useRenderCounter();
  increaseFn();

  return (
    <RenderCounterDisplay/>
  );
};

export default RenderCounter;
