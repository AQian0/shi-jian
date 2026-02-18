# 快速开始

## 安装

::: code-group

```shell [npm]
npm install @aqian0/shi-jian
```

```shell [pnpm]
pnpm add @aqian0/shi-jian
```

```shell [bun]
bun add @aqian0/shi-jian
```

:::

## 格式化

使用 `format` 将日期转换为字符串。

```ts
import { format } from '@aqian0/shi-jian'

const date = new Date('2024-01-15T14:30:00')

// 预设格式
format(date, 'full')   // '2024年1月15日星期一'
format(date, 'long')   // '2024年1月15日'
format(date, 'medium') // '2024年1月15日'
format(date, 'short')  // '2024/1/15'

// 自定义格式
format(date, 'YYYY-MM-DD')      // '2024-01-15'
format(date, 'YYYY年MM月DD日')   // '2024年01月15日'
format(date, 'HH:mm:ss')        // '14:30:00'
format(date, 'YYYY/MM/DD HH:mm') // '2024/01/15 14:30'

// 指定区域
format(date, 'long', 'en-US')  // 'January 15, 2024'
format(date, 'long', 'ja-JP')  // '2024年1月15日'

// 复合格式
format(date, { date: 'long', time: 'short' })  // '2024年1月15日 14:30'
```

## 解析

使用 `parse` 将字符串解析为 Date 对象。

```ts
import { parse } from '@aqian0/shi-jian'

// ISO 8601（默认）
parse('2024-01-15')
parse('2024-01-15T14:30:00')
parse('2024-01-15T14:30:00.000Z')

// 自定义格式
parse('2024-01-15', 'YYYY-MM-DD')
parse('15/01/2024', 'DD/MM/YYYY')
parse('2024年01月15日', 'YYYY年MM月DD日')
parse('January 15, 2024', 'MMMM DD, YYYY', 'en-US')
```

## 日期运算

添加或减少时间单位。

```ts
import {
  addDays,
  addMonths,
  addYears,
  addHours,
  addMinutes,
  addSeconds
} from '@aqian0/shi-jian'

const date = new Date('2024-01-15')

addDays(date, 5)     // 2024-01-20
addDays(date, -10)   // 2024-01-05
addMonths(date, 1)   // 2024-02-15
addYears(date, 1)    // 2025-01-15
addHours(date, 2)    // +2小时
addMinutes(date, 30) // +30分钟
addSeconds(date, 45) // +45秒
```

## 日期边界

获取时间段的开始或结束时刻。

```ts
import {
  dayStart, dayEnd,
  weekStart, weekEnd,
  monthStart, monthEnd,
  yearStart, yearEnd,
  hourStart, hourEnd,
  minuteStart, minuteEnd
} from '@aqian0/shi-jian'

const date = new Date('2024-01-15T14:30:45')

dayStart(date)    // 2024-01-15 00:00:00.000
dayEnd(date)      // 2024-01-15 23:59:59.999
monthStart(date)  // 2024-01-01 00:00:00.000
monthEnd(date)    // 2024-01-31 23:59:59.999
yearStart(date)   // 2024-01-01 00:00:00.000
yearEnd(date)     // 2024-12-31 23:59:59.999
weekStart(date)   // 当周开始
weekEnd(date)     // 当周结束
```

## 辅助函数

```ts
import {
  monthDays,
  yearDays,
  dayOfYear,
  nearestDay,
  isIso8601
} from '@aqian0/shi-jian'

monthDays(new Date('2024-02-15'))  // 29（闰年）
yearDays(new Date('2024-01-01'))   // 366（闰年）
dayOfYear(new Date('2024-12-31'))  // 366
nearestDay(new Date(), 1)          // 最近的周一
isIso8601('2024-01-15')            // true
```

## 时区

```ts
import { offset, applyOffset, removeOffset, tzDate } from '@aqian0/shi-jian'

offset(new Date(), 'utc', 'America/New_York')  // 获取偏移量
tzDate(new Date(), 'Asia/Tokyo')               // 带时区的日期
```

## 格式化 Token

| Token  | 输出   | 描述                 |
| ------ | ------ | -------------------- |
| `YYYY` | 2024   | 4 位数年份           |
| `YY`   | 24     | 2 位数年份           |
| `MMMM` | 一月   | 完整月份名           |
| `MMM`  | 1月    | 缩写月份名           |
| `MM`   | 01     | 2 位数月份           |
| `M`    | 1      | 月份                 |
| `DD`   | 01     | 2 位数日期           |
| `D`    | 1      | 日期                 |
| `dddd` | 星期一 | 完整星期名           |
| `ddd`  | 周一   | 缩写星期名           |
| `d`    | 1      | 星期数字             |
| `HH`   | 00-23  | 24小时制             |
| `hh`   | 01-12  | 12小时制             |
| `H`    | 0-23   | 24小时制（无前导零） |
| `h`    | 1-12   | 12小时制（无前导零） |
| `mm`   | 00-59  | 分钟                 |
| `ss`   | 00-59  | 秒                   |
| `a`    | am/pm  | 上午/下午            |
| `A`    | AM/PM  | 大写上午/下午        |
| `Z`    | +08:00 | 时区偏移             |
| `ZZ`   | +0800  | 时区偏移（无冒号）   |

## TypeScript

shi-jian 完全使用 TypeScript 编写，提供完整的类型定义。

```ts
import type {
  MaybeDateInput,
  Format,
  FormatStyle,
  FormatToken,
  ParseOptions,
  FormatOptions
} from '@aqian0/shi-jian'
```
