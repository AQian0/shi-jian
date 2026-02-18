# normalizeDate

规范化日期输入。

## 类型签名

```ts
function normalizeDate(date?: MaybeDateInput): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期输入 |

## 返回值

`Date` - 规范化后的 Date 对象

## 示例

```ts
import { normalizeDate } from '@aqian0/shi-jian'

normalizeDate('2024-01-15')        // Date object
normalizeDate(new Date())          // Date object
normalizeDate()                    // new Date()
```
