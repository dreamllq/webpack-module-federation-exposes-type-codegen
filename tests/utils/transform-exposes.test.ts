import { transformExposes } from '@/utils/transform-exposes';

describe('transformExposes', () => {
  test('array', () => {
    expect(transformExposes(['./a', './b'])).toEqual({
      './a': './a',
      './b': './b' 
    });
  });

  test('object', () => {
    expect(transformExposes({
      './a': './a1',
      './b': './b1' 
    })).toEqual({
      './a': './a1',
      './b': './b1' 
    });
  });

  test('illegal', () => {
    expect(transformExposes(11)).toEqual({});
  });
});