# minuteStart

获取一分钟的开始时间。

## 类型签名

```ts
function minuteStart(date?: MaybeDateInput): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`Date` - 一分钟开始时间的 Date 对象

## 示例

```ts
import { minuteStart } from '@aqian0/shi-jian'

minuteStart(new Date('2024-01-15T14:30:45'))
// 2024-01-15T14:30:00.000
```
