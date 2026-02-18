# addDays

添加或减少天数。

## 类型签名

```ts
function addDays(date?: MaybeDateInput, count?: number): Date
```

## 参数

| 参数    | 类型             | 默认值       | 描述               |
| ------- | ---------------- | ------------ | ------------------ |
| `date`  | `MaybeDateInput` | `new Date()` | 日期               |
| `count` | `number`         | `1`          | 天数（负数为减少） |

## 返回值

`Date` - 新的 Date 对象

## 示例

```ts
import { addDays } from '@aqian0/shi-jian'

addDays(new Date('2024-01-15'), 5)   // 2024-01-20
addDays(new Date('2024-01-15'), -10) // 2024-01-05
addDays(new Date('2024-01-15'))      // 2024-01-16
```
