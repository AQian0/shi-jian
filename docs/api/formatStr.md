# formatStr

获取指定格式的格式字符串模板。

## 类型签名

```ts
function formatStr(format: Format, locale?: string): string
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `format` | `Format` | - | 格式类型 |
| `locale` | `string` | `'device'` | 区域设置 |

## 返回值

`string` - 格式字符串模板

## 示例

```ts
import { formatStr } from '@aqian0/shi-jian'

formatStr('long', 'zh-CN')  // 'YYYY年M月D日'
formatStr('short', 'en-US') // 'M/D/YY'
```
