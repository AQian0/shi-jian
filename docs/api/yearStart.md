# yearStart

获取一年的开始时间。

## 类型签名

```ts
function yearStart(date?: MaybeDateInput): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`Date` - 一年开始时间的 Date 对象

## 示例

```ts
import { yearStart } from '@aqian0/shi-jian'

yearStart(new Date('2024-06-15'))
// 2024-01-01T00:00:00.000
```
