# format

将日期格式化为字符串。

## 类型签名

```ts
function format(date: MaybeDateInput, format?: Format, locale?: string): string
function format(options: FormatOptions): string
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | - | 要格式化的日期 |
| `format` | `Format` | `'long'` | 格式模板 |
| `locale` | `string` | `'device'` | 区域设置 |

## 返回值

`string` - 格式化后的日期字符串

## 示例

```ts
import { format } from '@aqian0/shi-jian'

const date = new Date('2024-01-15T14:30:00')

// 预设格式
format(date, 'full')   // '2024年1月15日星期一'
format(date, 'long')   // '2024年1月15日'
format(date, 'short')  // '2024/1/15'

// 自定义格式
format(date, 'YYYY-MM-DD')     // '2024-01-15'
format(date, 'YYYY年MM月DD日')  // '2024年01月15日'
format(date, 'HH:mm:ss')       // '14:30:00'

// 指定区域
format(date, 'long', 'en-US')  // 'January 15, 2024'

// 选项对象
format({
  date: new Date(),
  format: 'YYYY-MM-DD',
  tz: 'America/New_York'
})
```
