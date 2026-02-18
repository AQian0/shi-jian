# ap

获取本地化的 AM/PM 字符串。

## 类型签名

```ts
function ap(period: 'am' | 'pm', locale?: string): string
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `period` | `'am' \| 'pm'` | - | 时间段 |
| `locale` | `string` | `'device'` | 区域设置 |

## 返回值

`string` - 本地化的 AM/PM 字符串

## 示例

```ts
import { ap } from '@aqian0/shi-jian'

ap('am', 'en-US') // 'AM'
ap('pm', 'zh-CN') // '下午'
```
