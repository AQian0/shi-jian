# parts

获取格式的各个部分定义。

## 类型签名

```ts
function parts(format: Format, locale?: string): Part[]
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `format` | `Format` | - | 格式模板 |
| `locale` | `string` | `'device'` | 区域设置 |

## 返回值

`Part[]` - 格式部分定义数组

## 示例

```ts
import { parts } from '@aqian0/shi-jian'

const formatParts = parts('YYYY-MM-DD', 'zh-CN')
```
