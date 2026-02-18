# yearDays

获取指定年份的天数。

## 类型签名

```ts
function yearDays(date?: MaybeDateInput): number
```

## 参数

| 参数   | 类型             | 默认值       | 描述 |
| ------ | ---------------- | ------------ | ---- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`number` - 年份天数

## 示例

```ts
import { yearDays } from '@aqian0/shi-jian'

yearDays(new Date('2024-01-01')) // 366（闰年）
yearDays(new Date('2023-01-01')) // 365
```
