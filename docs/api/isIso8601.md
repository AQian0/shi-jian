# isIso8601

检查是否为有效的 ISO 8601 格式。

## 类型签名

```ts
function isIso8601(dateStr: string): boolean
```

## 参数

| 参数      | 类型     | 描述       |
| --------- | -------- | ---------- |
| `dateStr` | `string` | 日期字符串 |

## 返回值

`boolean` - 是否为有效的 ISO 8601 格式

## 示例

```ts
import { isIso8601 } from '@aqian0/shi-jian'

isIso8601('2024-01-15')           // true
isIso8601('2024-01-15T10:30:00Z') // true
isIso8601('15/01/2024')           // false
isIso8601('invalid')              // false
```
