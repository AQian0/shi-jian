# range

获取 token 的可能值范围。

## 类型签名

```ts
function range(token: FormatToken, locale?: string, genitive?: boolean): string[]
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `token` | `FormatToken` | - | 格式化 Token |
| `locale` | `string` | `'device'` | 区域设置 |
| `genitive` | `boolean` | `false` | 是否使用所有格形式 |

## 返回值

`string[]` - Token 的可能值数组

## 示例

```ts
import { range } from '@aqian0/shi-jian'

range('MMMM', 'zh-CN')
// ['一月', '二月', '三月', ...]

range('ddd', 'en-US')
// ['Sun', 'Mon', 'Tue', ...]
```
