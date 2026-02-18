# dayOfYear

获取日期是一年中的第几天。

## 类型签名

```ts
function dayOfYear(date?: MaybeDateInput): number
```

## 参数

| 参数   | 类型             | 默认值       | 描述 |
| ------ | ---------------- | ------------ | ---- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`number` - 一年中的第几天

## 示例

```ts
import { dayOfYear } from '@aqian0/shi-jian'

dayOfYear(new Date('2024-01-01')) // 1
dayOfYear(new Date('2024-12-31')) // 366
```
