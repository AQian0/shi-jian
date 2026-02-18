# nearestDay

获取最近的指定星期几。

## 类型签名

```ts
function nearestDay(date: MaybeDateInput, day: number): Date
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `date` | `MaybeDateInput` | 日期 |
| `day` | `number` | 目标星期（0=周日，1=周一，...，6=周六） |

## 返回值

`Date` - 最近的指定星期几的 Date 对象

## 示例

```ts
import { nearestDay } from '@aqian0/shi-jian'

// 获取最近的周一
nearestDay(new Date('2024-01-15'), 1)

// 获取最近的周五
nearestDay(new Date('2024-01-15'), 5)
```
