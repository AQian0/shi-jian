# applyOffset

应用时区偏移。

## 类型签名

```ts
function applyOffset(date: MaybeDateInput, offset: string): Date
```

## 参数

| 参数     | 类型             | 描述         |
| -------- | ---------------- | ------------ |
| `date`   | `MaybeDateInput` | 日期         |
| `offset` | `string`         | 偏移量字符串 |

## 返回值

`Date` - 应用偏移后的 Date 对象

## 示例

```ts
import { applyOffset } from '@aqian0/shi-jian'

applyOffset(new Date('2024-01-15T12:00:00Z'), '+08:00')
```
