# HTML Parser 测试

有关 HTML Parser 的测试用例优化，增加和修改了部分用例，处理了部分 Bug：

请参考`/week18/html-parser/src/parser.js`和`/week18/html-parser/test/parser.test.js`。

1. with property 3：增加一个属性在引号结束之后，直接跟随属性名的 Case，修复 afterQuotedAttributeValue 的问题。
2. attribute with no value：增加了对未赋值属性是否加入元素的测试，修复了 afterAttributeName 方法中遇到自封闭标签时，属性未被添加到元素上的问题。
3. attribute with no value2：增加了对于 data =时，属性值为空的 Case。修复了 beforeAttributeValue 方法中，遇到 data =会报错的问题。同时处理了 UnquotedAttributeValue 中的/和>判断无法生效的问题。
4. attribute with no value3：增加了 UnquotedAttributeValue 方法中，判断>条件的 Case
5. multiple spaces single element：增加了测试单标签中有多个空格，但没有属性的 Case。
6. empty tagname element：测试空标签</>的 Case，在 endTagOpen 方法中增加了相应处理，
7. script：增加了对封闭标签中存在空格的测试，如`</script >`。
8. 处理了 parseHTML 方法的 Bug。多次调用 parseHTML 时，需要重置全局变量，否则当前 attributes 会受到之前的缓存影响。

处理结果如下，标红的行已经全部处理完毕。
剩下一部分是标黄色的，都是一些代码中放空的判断，考虑到这部分不会影响测试结果，因此暂不处理。

| File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                  |
| --------- | ------- | -------- | ------- | ------- | -------------------------------------------------- |
| All files | 100     | 88.59    | 100     | 100     |
| parser.js | 100     | 88.59    | 100     | 100     | 20,116,134-136,162-164,177-179,196,217-242,250,406 |
