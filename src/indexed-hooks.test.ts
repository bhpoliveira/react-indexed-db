import { renderHook } from '@testing-library/react-hooks';

import { useIndexedDB, initDB, resetDB } from './indexed-hooks';

import { resetRequestMocks, openResult, store, request } from '../setupTests';

describe('useIndexedDB', () => {
  const setup = (database: string = null) => {
    if (database) {
      initDB({
        name: database,
        version: 1,
        objectStoresMeta: null,
      });
    }

    return renderHook(() => useIndexedDB(database));
  };

  beforeEach(() => {
    resetRequestMocks();
    resetDB();
  });

  describe('when do not initialize the database first', () => {
    it('thows an error', () => {
      const { result } = setup();

      expect(result.error.message).toBe(
        'Please, initialize the DB before the use.'
      )
    });
  });

  describe('getAll', () => {
    describe('when have an error', () => {
      it('thows an error', (done) => {
        const request = {
          onerror: jest.fn(),
          onsuccess: jest.fn(),
          a: 22,
        };
        const error = expect.anything();

        Object.defineProperty(request, 'onerror', {
          set: callback => callback(error),
        });

        store.getAll.mockImplementation(() => request);

        const { result } = setup('any');
        const { getAll } = result.current;

        getAll()
          .then(console.log)
          .catch((response) => {
            expect(response).toEqual(error);
            done();
          });
      });
    });

    // describe('when have a success response', () => {
    //   it('returs the result', (done) => {
    //     const { result } = setup('any');
    //     const { getAll } = result.current;
    //     const requestResult = expect.anything();

    //     const promise = getAll();

    //     openResult.onsuccess(null);

    //     Object.defineProperty(request, 'onsuccess', {
    //       set: callback => callback({ target: { result: requestResult } }),
    //     });

    //     promise.then((response) => {
    //       expect(response).toEqual(requestResult);
    //       done();
    //     });
    //   });
    // });
  });
});
