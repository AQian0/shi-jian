# addYears

添加或减少年数。

## 类型签名

```ts
function addYears(date?: MaybeDateInput, count?: number): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |
| `count` | `number` | `1` | 年数（负数为减少） |

## 返回值

`Date` - 新的 Date 对象

## 示例

```ts
import { addYears } from '@aqian0/shi-jian'

addYears(new Date('2024-01-15'), 1)  // 2025-01-15
addYears(new Date('2024-01-15'), -5) // 2019-01-15
```
