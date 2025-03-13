import { describe, it, expect } from 'vitest';
import { run } from './run';
import { FunctionResult, DiscountApplicationStrategy } from '../generated/api';

describe('shipping discounts function', () => {
  it('returns no discounts without configuration', () => {
    const result = run({
      discountNode: {
        metafield: null
      }
    });
    const expected: FunctionResult = {
      discounts: [],
    };

    expect(result).toEqual(expected);
  });
});