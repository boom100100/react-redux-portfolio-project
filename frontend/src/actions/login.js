export const login = (local_state) => {
  return {
    type: 'LOG_IN',
    state: local_state
  };
};
