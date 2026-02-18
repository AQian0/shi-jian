# weekStart

获取一周的开始时间。

## 类型签名

```ts
function weekStart(date?: MaybeDateInput, weekStartsOn?: number): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |
| `weekStartsOn` | `number` | `0` | 一周的开始（0=周日，1=周一） |

## 返回值

`Date` - 一周开始时间的 Date 对象

## 示例

```ts
import { weekStart } from '@aqian0/shi-jian'

// 默认周日为一周开始
weekStart(new Date('2024-01-15')) // 2024-01-14（周日）

// 指定周一为一周开始
weekStart(new Date('2024-01-15'), 1) // 2024-01-15（周一）
```
