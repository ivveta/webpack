const createAnalytics = () => {
  // variables types just for test
  let counter: number = 0;
  let isDestroyed: boolean = false;

  const listener = () => counter++;

  document.addEventListener('click', listener);

  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return 'Analytics is destroyed';
      }
      return counter;
    },
  };
};

window['analytics'] = createAnalytics();
