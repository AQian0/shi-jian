# yearEnd

获取一年的结束时间。

## 类型签名

```ts
function yearEnd(date?: MaybeDateInput): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | `new Date()` | 日期 |

## 返回值

`Date` - 一年结束时间的 Date 对象

## 示例

```ts
import { yearEnd } from '@aqian0/shi-jian'

yearEnd(new Date('2024-06-15'))
// 2024-12-31T23:59:59.999
```
