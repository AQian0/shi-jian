# removeOffset

移除时区偏移。

## 类型签名

```ts
function removeOffset(date: MaybeDateInput, offset: string): Date
```

## 参数

| 参数     | 类型             | 描述         |
| -------- | ---------------- | ------------ |
| `date`   | `MaybeDateInput` | 日期         |
| `offset` | `string`         | 偏移量字符串 |

## 返回值

`Date` - 移除偏移后的 Date 对象

## 示例

```ts
import { removeOffset } from '@aqian0/shi-jian'

removeOffset(new Date('2024-01-15T20:00:00+08:00'), '+08:00')
```
