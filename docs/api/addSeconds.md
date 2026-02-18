# addSeconds

添加或减少秒数。

## 类型签名

```ts
function addSeconds(date?: MaybeDateInput, count?: number): Date
```

## 参数

| 参数    | 类型             | 默认值       | 描述               |
| ------- | ---------------- | ------------ | ------------------ |
| `date`  | `MaybeDateInput` | `new Date()` | 日期               |
| `count` | `number`         | `1`          | 秒数（负数为减少） |

## 返回值

`Date` - 新的 Date 对象

## 示例

```ts
import { addSeconds } from '@aqian0/shi-jian'

addSeconds(new Date('2024-01-15T14:30:00'), 30)  // 2024-01-15T14:30:30
addSeconds(new Date('2024-01-15T14:30:00'), -60) // 2024-01-15T14:29:00
```
