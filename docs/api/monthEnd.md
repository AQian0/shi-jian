# monthEnd

获取一月的结束时间。

## 类型签名

```ts
function monthEnd(date?: MaybeDateInput): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`Date` - 一月结束时间的 Date 对象

## 示例

```ts
import { monthEnd } from '@aqian0/shi-jian'

monthEnd(new Date('2024-01-15'))
// 2024-01-31T23:59:59.999

monthEnd(new Date('2024-02-15'))
// 2024-02-29T23:59:59.999（闰年）
```
