# shi-jian

[中文](./README.md) | English

> ⚠️ **This library is still under development, and the API may change**

shi-jian (时间, meaning "time" in Chinese), an ergonomic modern JavaScript date handling library.

## Features

### 🚀 Zero Production Dependencies

shi-jian has no production dependencies, so you can safely import it into your project without worrying about dependency conflicts or bundle bloat.

### 🌐 Native & Modern API

Built on native `Date` and `Intl` objects, fully leveraging the native APIs provided by browsers and Node.js, and continuously improving with the evolution of JavaScript standards.

### 🔒 Immutability

Provides strong immutability guarantees, ensuring data won't be accidentally modified, supporting side-effect-free functional programming style.

### 📘 Type Support

Built-in TypeScript type definitions, providing comprehensive type checking and intelligent hints to enhance the development experience.

## Quick Start

### Installation

```shell
npm install @aqian0/shi-jian
```

```shell
pnpm add @aqian0/shi-jian
```

```shell
bun add @aqian0/shi-jian
```

## Philosophy

### `null` vs `undefined`

We prefer `undefined` as the standard falsy value. On one hand, `null` has inherent implementation disadvantages, requiring additional checks and handling in many methods, while `undefined` is undoubtedly more universal in frontend scenarios that don't involve databases and classes. On the other hand, from a real-world perspective, dates always exist — when users retrieve a date, they either get a value not defined as a date, or a value corresponding to an actual date. There's no situation where a date is "null".

### Error Handling

Since shi-jian is a zero-dependency library, it's unlikely to implement complex and comprehensive error handling, which also doesn't align with its lightweight positioning. Considering its relatively "flat" usage scenarios, throwing errors directly is acceptable — this is a design trade-off.

## Roadmap

- [x] Falsy value handling standardization

- [ ] Exception and error handling optimization

- [ ] Performance improvements
  - [x] Function caching

  - [ ] Bundle size

  - [ ] Complex function calls

  - [ ] Regex replacement and conversion

- [ ] Type declaration adjustments

- [x] Test coverage improvements

- [ ] Documentation
  - [x] JSDoc

  - [x] English version

- [ ] CI/CD
  - [x] Review

  - [ ] Release

## Acknowledgements

- [tempo](https://github.com/formkit/tempo): Source of inspiration and design, early code heavily referenced this project's source code.
