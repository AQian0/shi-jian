# parseParts

解析日期字符串的各个部分。

## 类型签名

```ts
function parseParts(dateStr: string, parts: Part[]): FilledPart[]
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `dateStr` | `string` | 要解析的日期字符串 |
| `parts` | `Part[]` | 格式部分定义 |

## 返回值

`FilledPart[]` - 填充后的格式部分数组

## 示例

```ts
import { parseParts, parts } from '@aqian0/shi-jian'

const formatParts = parts('YYYY-MM-DD', 'zh-CN')
const result = parseParts('2024-01-15', formatParts)
```
