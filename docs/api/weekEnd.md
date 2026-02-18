# weekEnd

获取一周的结束时间。

## 类型签名

```ts
function weekEnd(date?: MaybeDateInput, weekStartsOn?: number): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |
| `weekStartsOn` | `number` | `0` | 一周的开始（0=周日，1=周一） |

## 返回值

`Date` - 一周结束时间的 Date 对象

## 示例

```ts
import { weekEnd } from '@aqian0/shi-jian'

weekEnd(new Date('2024-01-15'))
// 2024-01-20T23:59:59.999
```
