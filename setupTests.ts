export const request = {
  onsuccess: jest.fn(),
  onerror: jest.fn(),
};

export const store = {
  add: jest.fn(),
  getByID: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  deleteRecord: jest.fn(),
  clear: jest.fn(),
  openCursor: jest.fn(),
  getByIndex: jest.fn(),
};

export const database = {
  objectStoreNames: {
    contains: jest.fn(() => true),
  },
  transaction: () => ({
    onerror: jest.fn(),
    oncomplete: jest.fn(),
    onabort: jest.fn(),
    objectStore: jest.fn(() => store),
  }),
};

export const openResult = {
  onerror: jest.fn(),
  result: database,
};

Object.defineProperty(openResult, 'onsuccess', {
  set: (callback:Function) => callback()
});

(window as any).indexedDB = {
  open: () => openResult,
};

export const resetRequestMocks = () => {
  request.onsuccess = jest.fn();
  request.onerror = jest.fn();
};
