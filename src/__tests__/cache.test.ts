import { describe, expect, it } from "vitest";

import { createLRUCache } from "../cache";

describe("createLRUCache", () => {
  it("should cache and retrieve values", () => {
    const cache = createLRUCache<string, number>(3);

    cache.set("a", 1);
    cache.set("b", 2);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBeUndefined();
  });

  it("should evict least recently used item when exceeding size limit", () => {
    const cache = createLRUCache<string, number>(3);

    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);

    // All items should be present
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);

    // Add fourth item, should evict 'a' (least recently used)
    cache.set("d", 4);

    expect(cache.get("a")).toBeUndefined(); // Evicted
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
    expect(cache.get("d")).toBe(4);
  });

  it("should update access order on get", () => {
    const cache = createLRUCache<string, number>(3);

    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);

    // Access 'a', making it most recently used
    cache.get("a");

    // Add fourth item, should evict 'b' (now least recently used)
    cache.set("d", 4);

    expect(cache.get("a")).toBe(1); // Still present
    expect(cache.get("b")).toBeUndefined(); // Evicted
    expect(cache.get("c")).toBe(3);
    expect(cache.get("d")).toBe(4);
  });

  it("should update existing keys without increasing size", () => {
    const cache = createLRUCache<string, number>(2);

    cache.set("a", 1);
    cache.set("b", 2);

    expect(cache.size).toBe(2);

    // Update existing key
    cache.set("a", 10);

    expect(cache.size).toBe(2);
    expect(cache.get("a")).toBe(10);
    expect(cache.get("b")).toBe(2);
  });

  it("should support has() method", () => {
    const cache = createLRUCache<string, number>(2);

    cache.set("a", 1);

    expect(cache.has("a")).toBe(true);
    expect(cache.has("b")).toBe(false);
  });

  it("should support clear() method", () => {
    const cache = createLRUCache<string, number>(2);

    cache.set("a", 1);
    cache.set("b", 2);

    expect(cache.size).toBe(2);

    cache.clear();

    expect(cache.size).toBe(0);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
  });
});
