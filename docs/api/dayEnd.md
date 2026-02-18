# dayEnd

获取一天的结束时间（23:59:59.999）。

## 类型签名

```ts
function dayEnd(date?: MaybeDateInput): Date
```

## 参数

| 参数   | 类型             | 默认值       | 描述 |
| ------ | ---------------- | ------------ | ---- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`Date` - 一天结束时间的 Date 对象

## 示例

```ts
import { dayEnd } from '@aqian0/shi-jian'

dayEnd(new Date('2024-01-15T14:30:45'))
// 2024-01-15T23:59:59.999
```
