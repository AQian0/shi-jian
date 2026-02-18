# addMinutes

添加或减少分钟。

## 类型签名

```ts
function addMinutes(date?: MaybeDateInput, count?: number): Date
```

## 参数

| 参数    | 类型             | 默认值       | 描述                 |
| ------- | ---------------- | ------------ | -------------------- |
| `date`  | `MaybeDateInput` | `new Date()` | 日期                 |
| `count` | `number`         | `1`          | 分钟数（负数为减少） |

## 返回值

`Date` - 新的 Date 对象

## 示例

```ts
import { addMinutes } from '@aqian0/shi-jian'

addMinutes(new Date('2024-01-15T14:30:00'), 15)  // 2024-01-15T14:45:00
addMinutes(new Date('2024-01-15T14:30:00'), -45) // 2024-01-15T13:45:00
```
