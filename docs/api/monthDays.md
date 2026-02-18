# monthDays

获取指定月份的天数。

## 类型签名

```ts
function monthDays(date?: MaybeDateInput): number
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`number` - 月份天数

## 示例

```ts
import { monthDays } from '@aqian0/shi-jian'

monthDays(new Date('2024-01-15')) // 31
monthDays(new Date('2024-02-15')) // 29（闰年）
monthDays(new Date('2023-02-15')) // 28
```
