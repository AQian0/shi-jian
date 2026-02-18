# addHours

添加或减少小时。

## 类型签名

```ts
function addHours(date?: MaybeDateInput, count?: number): Date
```

## 参数

| 参数    | 类型             | 默认值       | 描述                 |
| ------- | ---------------- | ------------ | -------------------- |
| `date`  | `MaybeDateInput` | `new Date()` | 日期                 |
| `count` | `number`         | `1`          | 小时数（负数为减少） |

## 返回值

`Date` - 新的 Date 对象

## 示例

```ts
import { addHours } from '@aqian0/shi-jian'

addHours(new Date('2024-01-15T14:00:00'), 2)  // 2024-01-15T16:00:00
addHours(new Date('2024-01-15T14:00:00'), -3) // 2024-01-15T11:00:00
```
