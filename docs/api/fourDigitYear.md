# fourDigitYear

将 2 位年份转为 4 位年份。

## 类型签名

```ts
function fourDigitYear(year: string | number): number
```

## 参数

| 参数   | 类型               | 描述     |
| ------ | ------------------ | -------- |
| `year` | `string \| number` | 2 位年份 |

## 返回值

`number` - 4 位年份

## 示例

```ts
import { fourDigitYear } from '@aqian0/shi-jian'

fourDigitYear('24') // 2024
fourDigitYear('99') // 1999
fourDigitYear(24)   // 2024
```
