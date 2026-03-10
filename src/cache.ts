type LRUCache<TKey, TValue> = {
  get: (key: TKey) => TValue | undefined;
  set: (key: TKey, value: TValue) => void;
  has: (key: TKey) => boolean;
  clear: () => void;
  readonly size: number;
};

/**
 * @description Create a Least Recently Used (LRU) cache with size limit.
 * When the cache exceeds maxSize, the least recently accessed item is removed.
 */
export const createLRUCache = <TKey, TValue>(maxSize: number): LRUCache<TKey, TValue> => {
  if (!Number.isInteger(maxSize) || maxSize <= 0) {
    throw new RangeError(`maxSize must be a positive integer, got: ${maxSize}`);
  }

  const cache = new Map<TKey, TValue>();

  return {
    get: (key: TKey): TValue | undefined => {
      if (!cache.has(key)) {
        return void 0;
      }
      const value = cache.get(key);
      // LRU: Move accessed item to the end (most recently used)
      cache.delete(key);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- existence verified by has() above
      cache.set(key, value!);
      return value;
    },
    set: (key: TKey, value: TValue): void => {
      // Remove existing key if present (to update position)
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= maxSize) {
        // Remove oldest entry (first item in Map)
        const firstKey = cache.keys().next();
        if (!firstKey.done) {
          cache.delete(firstKey.value);
        }
      }
      cache.set(key, value);
    },
    has: (key: TKey): boolean => cache.has(key),
    clear: (): void => {
      cache.clear();
    },
    get size(): number {
      return cache.size;
    },
  };
};
