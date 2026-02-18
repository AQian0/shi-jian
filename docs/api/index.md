# API 参考

选择左侧分类查看具体函数文档。

## 快速导航

### 格式化

- [format](/api/format) - 将日期格式化为字符串
- [formatStr](/api/formatStr) - 获取格式字符串模板

### 解析

- [parse](/api/parse) - 将字符串解析为 Date 对象
- [parseParts](/api/parseParts) - 解析日期字符串的各个部分
- [parts](/api/parts) - 获取格式的各个部分定义

### 日期运算

- [addDays](/api/addDays) - 添加/减少天数
- [addMonths](/api/addMonths) - 添加/减少月数
- [addYears](/api/addYears) - 添加/减少年数
- [addHours](/api/addHours) - 添加/减少小时
- [addMinutes](/api/addMinutes) - 添加/减少分钟
- [addSeconds](/api/addSeconds) - 添加/减少秒数

### 日期边界

- [dayStart](/api/dayStart) / [dayEnd](/api/dayEnd) - 一天的开始/结束
- [weekStart](/api/weekStart) / [weekEnd](/api/weekEnd) - 一周的开始/结束
- [monthStart](/api/monthStart) / [monthEnd](/api/monthEnd) - 一月的开始/结束
- [yearStart](/api/yearStart) / [yearEnd](/api/yearEnd) - 一年的开始/结束
- [hourStart](/api/hourStart) / [hourEnd](/api/hourEnd) - 一小时的开始/结束
- [minuteStart](/api/minuteStart) / [minuteEnd](/api/minuteEnd) - 一分钟的开始/结束

### 时区

- [offset](/api/offset) - 获取时区偏移量
- [applyOffset](/api/applyOffset) - 应用时区偏移
- [removeOffset](/api/removeOffset) - 移除时区偏移
- [tzDate](/api/tzDate) - 创建带时区的日期

### 辅助函数

- [normalizeDate](/api/normalizeDate) - 规范化日期输入
- [monthDays](/api/monthDays) - 获取月份天数
- [yearDays](/api/yearDays) - 获取年份天数
- [dayOfYear](/api/dayOfYear) - 获取一年中的第几天
- [nearestDay](/api/nearestDay) - 获取最近的指定星期几
- [fourDigitYear](/api/fourDigitYear) - 将 2 位年份转为 4 位
- [ap](/api/ap) - 获取本地化 AM/PM
- [range](/api/range) - 获取 token 的可能值范围
- [isIso8601](/api/isIso8601) - 检查 ISO 8601 格式
