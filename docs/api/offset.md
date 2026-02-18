# offset

获取时区偏移量。

## 类型签名

```ts
function offset(date: MaybeDateInput, from: string, to: string, format?: TimezoneToken): string
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `date` | `MaybeDateInput` | - | 日期 |
| `from` | `string` | - | 源时区 |
| `to` | `string` | - | 目标时区 |
| `format` | `TimezoneToken` | `'Z'` | 偏移格式 |

## 返回值

`string` - 时区偏移量字符串

## 示例

```ts
import { offset } from '@aqian0/shi-jian'

offset(new Date(), 'utc', 'America/New_York')      // '-05:00'
offset(new Date(), 'utc', 'Asia/Shanghai', 'ZZ')   // '+0800'
```
