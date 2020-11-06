'use strict';

const { errors, error } = require('../index.js');

describe('error', () => {
  it('generates a valid Error', () => {
    const err = error(errors.system.UNCAUGHT({}));
    expect(err instanceof Error).toBe(true);
    expect(err.message).toBe('System hiccup! We have been alerted and will be resolving the issue as soon as we can');
    expect(err.debug.internalMessage).toBe('');
    expect(err.code).toBe(9999);
    expect(err.name).toBe('SYSTEM.UNCAUGHT');
  });

  it('generates a valid Error - No errors used', () => {
    const err = error({ message : 'Message' });
    expect(err instanceof Error).toBe(true);
    expect(err.message).toBe('Message');
  });

  it('generates a valid Error with original Error', () => {
    const originalError = new Error('Original Error');

    const err = error(errors.system.UNCAUGHT({ debug : { originalError } }));
    expect(err instanceof Error).toBe(true);
    expect(err.message).toBe('System hiccup! We have been alerted and will be resolving the issue as soon as we can');
    expect(err.debug.internalMessage).toBe('');
    expect(err.code).toBe(9999);
    expect(err.debug.originalError).toBe(originalError);
    expect(err.name).toBe('SYSTEM.UNCAUGHT');
  });

  it('generates a valid Error with original Error and allows context', () => {
    const originalError = new Error('Original Error');

    const err = error(errors.system.UNCAUGHT({ debug : { originalError }, messageContext : 'some context' }));
    expect(err instanceof Error).toBe(true);
    expect(err.message).toBe('System hiccup! We have been alerted and will be resolving the issue as soon as we can: some context');
    expect(err.debug.internalMessage).toBe('');
    expect(err.code).toBe(9999);
    expect(err.debug.originalError).toBe(originalError);
    expect(err.name).toBe('SYSTEM.UNCAUGHT');
  });

  it('generates a valid Error with no additional params', () => {
    const err = error(errors.system.UNCAUGHT());
    expect(err.message).toBe('System hiccup! We have been alerted and will be resolving the issue as soon as we can');
    expect(err.code).toBe(9999);
    expect(err.name).toBe('SYSTEM.UNCAUGHT');
  });

  it('overrides the default message and internalMessage', () => {
    const err = error(errors.auth.UNAUTHORIZED_API_ACCESS({
      message : 'Override message',
      debug   : {
        internalMessage :
            'Programming error: Object X should contain a property Y'
      }
    }));
    expect(err instanceof Error).toBe(true);
    expect(err.message).toBe('Override message');
    expect(err.code).toBe(5000);
    expect(err.name).toBe('AUTH.UNAUTHORIZED_API_ACCESS');
  });
});
