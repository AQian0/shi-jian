# tzDate

创建带时区的日期。

## 类型签名

```ts
function tzDate(date: MaybeDateInput, tz: string): Date
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `date` | `MaybeDateInput` | 日期 |
| `tz` | `string` | 时区标识 |

## 返回值

`Date` - 带时区的 Date 对象

## 示例

```ts
import { tzDate } from '@aqian0/shi-jian'

tzDate(new Date(), 'Asia/Tokyo')
tzDate(new Date(), 'America/New_York')
```
