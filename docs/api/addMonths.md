# addMonths

添加或减少月数。

## 类型签名

```ts
function addMonths(date?: MaybeDateInput, count?: number): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |
| `count` | `number` | `1` | 月数（负数为减少） |

## 返回值

`Date` - 新的 Date 对象

## 示例

```ts
import { addMonths } from '@aqian0/shi-jian'

addMonths(new Date('2024-01-15'), 1)  // 2024-02-15
addMonths(new Date('2024-01-15'), -2) // 2023-11-15

// 处理月末日期
addMonths(new Date('2024-01-31'), 1)  // 2024-02-29（闰年）
```
