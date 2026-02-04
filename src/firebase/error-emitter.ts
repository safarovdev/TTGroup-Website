type Listener = (error: any) => void;
const listeners: Listener[] = [];

export const errorEmitter = {
  on(event: string, listener: Listener) {
    if (event === 'permission-error') {
      listeners.push(listener);
    }
  },
  emit(event: string, error: any) {
    if (event === 'permission-error') {
      listeners.forEach(listener => listener(error));
    }
  },
  off(event: string, listener: Listener) {
    if (event === 'permission-error') {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
};
