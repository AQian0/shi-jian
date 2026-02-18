# hourEnd

获取一小时的结束时间。

## 类型签名

```ts
function hourEnd(date?: MaybeDateInput): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`Date` - 一小时结束时间的 Date 对象

## 示例

```ts
import { hourEnd } from '@aqian0/shi-jian'

hourEnd(new Date('2024-01-15T14:30:45'))
// 2024-01-15T14:59:59.999
```
