# parse

将字符串解析为 Date 对象。

## 类型签名

```ts
function parse(dateStr: string, format?: Format, locale?: string): Date
function parse(options: ParseOptions): Date
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `dateStr` | `string` | - | 要解析的日期字符串 |
| `format` | `Format` | `'ISO8601'` | 格式模板 |
| `locale` | `string` | `'device'` | 区域设置 |

## 返回值

`Date` - 解析后的 Date 对象

## 示例

```ts
import { parse } from '@aqian0/shi-jian'

// ISO 8601（默认）
parse('2024-01-15')
parse('2024-01-15T14:30:00')

// 自定义格式
parse('2024-01-15', 'YYYY-MM-DD')
parse('15/01/2024', 'DD/MM/YYYY')

// 选项对象
parse({
  date: '2024-02-31',
  format: 'YYYY-MM-DD',
  dateOverflow: 'backward' // 返回 2024-02-29
})
```
