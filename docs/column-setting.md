a-table 查询结果显示列配置 组件
====
props: 

1、hiddenColumn: 固定隐藏列，类型为字符数组，例如 ['delFlag'],应用场景：用户无审批权限时，隐藏审批列delFlag

2、columns: 传入a-table 组件的 columns 属性,例如：[ {title: '参数名称', dataIndex: 'configName'},{title: '参数键名',dataIndex: 'configKey'}]

out events:

1、ok：保存配置后回调事件
输出参数: 选中的显示列，类型为字符数组 例如 ['name','createTime']

by snaker 2020/12/04

