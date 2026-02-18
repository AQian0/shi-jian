# dayStart

获取一天的开始时间（00:00:00.000）。

## 类型签名

```ts
function dayStart(date?: MaybeDateInput): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`Date` - 一天开始时间的 Date 对象

## 示例

```ts
import { dayStart } from '@aqian0/shi-jian'

dayStart(new Date('2024-01-15T14:30:45'))
// 2024-01-15T00:00:00.000
```
