import { expect } from 'chai';
import { encode, decode } from '../base64/src/base64';

describe('Base64', () => {
  it('should be encoded string', () => {
    expect(encode('M')).to.equal('TQ==');
  });

  it('should be encoded string (unicode)', () => {
    expect(encode('✓ à la mode')).to.equal('4pyTIMOgIGxhIG1vZGU=');
  });

  it('should be decoded string (unicode)', () => {
    expect(decode('4pyTIMOgIGxhIG1vZGU=')).to.equal('✓ à la mode');
  });
});
