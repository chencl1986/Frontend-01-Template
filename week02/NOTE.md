编程语言通识与JavaScript语言设计
	语言按语法分类
		非形式语言
			中文
			英文
			C++也属于非形式语言
		形式语言（乔姆斯基谱系）
			0信	无限制文法
				该类型的文法能够产生所有可被图灵机识别的语言。
可被图灵机识别的语言是指能够使图灵机停机的字符串，这类语言又被称为递归可枚举语言。
注意递归可枚举语言与递归语言的区别，后者是前者的一个真子集，是能够被一个总停机的图灵机判定的语言。
			1型	上下文相关文法
				这种文法的产生式规则取如 αAβ -> αγβ 一样的形式。
这里的A 是非终结符号，而 α, β 和 γ 是包含非终结符号与终结符号的字符串；
α, β 可以是空串，但 γ 必须不能是空串；
这种文法也可以包含规则 S->ε ，但此时文法的任何产生式规则都不能在右侧包含 S 。
这种文法规定的语言可以被线性有界非确定图灵机接受。
				JavaScript等。
				对语言解释器的实现不友好。
			2型	上下文无关文法
				这种文法的产生式规则取如 A -> γ 一样的形式。
这里的A 是非终结符号，γ 是包含非终结符号与终结符号的字符串。
这种文法规定的语言可以被非确定下推自动机接受。
上下文无关语言为大多数程序设计语言的语法提供了理论基础。
				大部分的编程语言，主体上是上下文无关文法。
			3型	正则文法
				这种文法要求产生式的左侧只能包含一个非终结符号，产生式的右侧只能是空串、一个终结符号或者一个终结符号后随一个非终结符号；
如果所有产生式的右侧都不含初始符号 S ，规则 S -> ε 也允许出现。
这种文法规定的语言可以被有限状态自动机接受，也可以通过正则表达式来获得。
正则语言通常用来定义检索模式或者程序设计语言中的词法结构。
				能用正则表达式解析的文法。
				会限制表达能力，基本不使用。
	产生式（巴科斯范式BNF）
		用尖括号括起来的名称来表示语法结构名
		语法结构分层基础结构和其他语法结构定义的符合结构
			基础结构称终结符
				例如*，它不由任何其他语法结构构成，即为终结符。
				引号和中间的字符表示终结符
					可以有括号
					* 表示可重复多次
					| 表示或
					+ 表示至少一次
				终结符：
					Number
					+ - * /
			复合结构称非终结符
				1 * 2是一个乘法表达式，它由数字和*组成，它是一个复合结构，即为非终结符。
				四则运算：
					1 + 2 * 3
		BNF实例
			用BNF设计一个只能由a和b组成，可以表示任意ab组合字符的程序
				<Program> ::= <Program> "a" + | <Program> "b" +
			用递归定义一个整数加法
				1. 定义十进制数
					<Number> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<DecimalNumber> ::= "0" | (("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9") <Number>* )
					用正则表示定义：<DecimalNumber> =  /0|[1-9][0-9]*/
				2. 定义加法
					<Expression> ::= <DecimalNumber> "+" <DecimalNumber>
				3. 递归加法
					<AdditiveExpression> ::= <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>
			设计一个四则运算
				1. 递归加法
					<AdditiveExpression> ::= <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>
				2. 递归乘法
					<MultiplicativeExpression> ::= <DecimalNumber> | <MultiplicativeExpression>  "*" <DecimalNumber>
				3. 递归表达加法与乘法，如1 + 2 * 3
					<AdditiveExpression> ::= <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression>
				4. 递归加减法
					<AdditiveExpression> ::= <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber> | <AdditiveExpression> "-" <DecimalNumber>
				5. 递归乘除法
					<MultiplicativeExpression> ::= <DecimalNumber> | <MultiplicativeExpression>  "*" <DecimalNumber> | <MultiplicativeExpression>  "/" <DecimalNumber>
				6. 设计逻辑表达式
					<LogicalExpression> ::= <AdditiveExpression> | 
<LogicalExpression> "||" <AdditiveExpression>  | <LogicalExpression>  "&&" <AdditiveExpression>
				7. 带括号的四则运算
					<PrimaryExpression> ::= <DecimalNumber> |
"(" <LogicalExpression> ")"
		其他产生式：EBNF、ABNF
	通过产生式理解乔姆斯基体系
		0信	无限制文法
			?::=?
		1型	上下文相关文法
			?<A>?::=?<B>?
				意为<A>在？所表示的上下文之间，会被解释成<B>
		2型	上下文无关文法
			<A>::=?
				等号左边只能有一个非终结符，即<A>无论在哪里都是由?所代表的的字符产生的。
		3型	正则文法
			<A>::=<A>?
				<A>::=?<A> 错的
			只允许左递归，JavaScript在**出现之前，都可用正则分析。
{ get a{ return 1 }, get: 1 }，get在此处类似于关键字，即与上下文相关，此段JavaScript代码为1型。
		用正则分析，叫做词法分析。
建立抽象表达式，叫做语法分析。
	JavaScript的产生式
		词法定义（双冒号表示）：
Comment ::
MultiLineComment
SingleLineComment
		语法定义（单冒号表示）：
AdditiveExpression :
AdditiveExpression + MultiplicativeExpression
AdditiveExpression - MultiplicativeExpression
			: 相当于BNF中的::=
			换行相当于BNF中的 |
			+、-为终结符，在文档中为加粗表示
	现代语言的特例
		C++中，*可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型
			C++属于非形式语言，写编译器时，会进行预处理，之后相当于2型
		VB中，〈可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
			1型文法
		Python中，行首的tab符和空格会根据上一行的行首空白以一定规则敏处理成虚拟终结宿indent或者dedent
			indent或者dedent也需要进行预处理，可以认为是非形式语言
		JavaScript中，/可能是除号，也可能是正则表达式开头，处理方式类似于VB,字符串模板中也需要特殊处理｝,还有自动插入分号规则
			/ 的处理类似于VB和JSX。
	语言的分类
		形式语言一用途
			数据描述语言
				JSON, HTML, XAML, SQL, CSS
			编程语言
				C, C++, Java, C#, Python, Ruby, Perl, Lisp, T-SQL, Clojure, Haskell, JavaScript
		形式语言一表达方式
			声明式语言
				JSON, HTML, XAML, SQL, CSS, Lisp, Clojure, Haskell
			命令型语言
				C, C++, Java, C#, Python, Ruby, Perl, JavaScript
	图灵完备性
		命令式 -- 图灵机
			goto
				C语言
			if和while
				现代编程语言，多数不允许使用goto
		声明式 -- lambda
			递归
			目前无编程语言采用此方案
		跟图灵机等效的，就成为图灵完备性。所有编程语言都具备的特性
	动态与静态
		动态
			在用户的设备/在线服务器上
			产品实际运行时
			在用户的设备或在线服务器上运行，执行的时机就是产品实际运行的时机。
			Runtime（运行时）
				即为产品实际运行时，内存里的设施。对应解释型语言。
		静态
			在程序员的设备上
			产品开发时
			Compiletime（编译时）
				对应编译型语言。
			静态中最重要的功能，即为类型检查。
	类型系统
		动态类型系统与静态类型系统
			TypeScript中有的是静态类型系统。
		强类型与弱类型
			String + Number
			String == Boolean
				Boolean先转换为Number，再和String计算。
			有隐式转换为弱类型
		复合类型
			结构体
				如对象{a: T1, b: T2}
			函数签名
				函数入参和返回值：(T1, T2) => T3
		子类型
			逆变/协变
				协变：凡是能用Array<Parent>的地方，都能用Array<Child>
				逆变：凡是能用Function<Child>的地方，都能用Function<Parent>，Function的参数是Child，也可以使用Parent。
	一般命令式编程语言
		
			Atom
				Identifi er
					标识符、变量名
				Literal
					直接量
				最小单位
			Expression
				Atom
				Operator
				 Punctuator
					操作符+-*/()等
				表达式
			Statement
				Expression
				Keyword
					关键字
				Punctuator
				语句
			Structure
				Function
				Class
				Process
				 Namespace
				结构化
			Program
				Program
				Module
				Package
				Library
				程序集
				JavaScript中只有这两者

2. 重学 JavaScript 词法，类型
	Unicode
		推荐网站
			Blocks
				Basic Latin
					兼容ASCII的部分，最常用。
通常要求JavaScript代码使用这部分字符。
					// 打印所有的Basic Latin字符
for (let index = 0; index < 128; index++) {
  console.log(String.fromCharCode(index));
  document.write(`<span style="background: lightgreen;">${String.fromCharCode(index)}</span><br />`)
}
						换行	LINE FEED (LF) (U+000A)
							对应机械打印机的换行
						翻页	FORM FEED (FF) (U+000C)
							对应机械打印机的换纸
						空格		SPACE (U+0020)
				CJK Unified Ideographs（中日韩字符）
					JavaScript支持中文变量名，为保证各环境转码相同，可用Unicode代替。
如var 厉害 = 1;可用var \uxxx\uxxx = 1;
					常用的判断中文字符方法是判断是否在U+4E00到U+9FFF之间，但会错误判断部分日韩字符，而且CJK系列还有其他字符集，也会出现遗漏。
					可用中文做变量名，但由于在不同环境可能会出现错误，推荐使用ASCII编码作为变量名为佳。
						var 厉害 = 1; // JavaScript支持中文变量
console.log(厉害);
						如果确实有中文变量名需求，可以使用\转义
console.log('厉害'.codePointAt(0).toString(16)); // 5389
console.log('厉害'.codePointAt(1).toString(16)); // 5bb3
var \u5389\u5bb3 = 1
console.log(厉害);
				Basic Multilingual Plane 基本多文种平面，简称BMP
					兼容性好，如果无法保证代码支付在ASCII内，至少也要在BMP范围内。
					BMP内的字符，可通过如下API处理。
						String.fromCharCode
						new String().charCodeAt
						考虑到UTF的存储方式，该系列API可能性能更佳
					超出此范围的字符，需要用如下API处理。
						String.fromCodePoint
						new String().codePointAt
						适用范围更广
				14000以上，即超出BMP的部分慎用，容易出问题。比如标准支持所有的Unicode字符，也就是说理论上Emoji字符也可以用作变量名，但实际浏览器会阻止此行为。
			Categories
				[Zs]	Separator, Space
					该分类下所有Space，在JavaScript中都为合法空格。
		字符集，每个字符都对应一个码点。
虽然JavaScript使用的Unicode字符集并非ASCII字符，但大多数编程语言都兼容了ASCII的编码方式。
因此可以直接使用。
	ECMA-262, 10th edition, June 2019 - A Grammar Summary
		A.1 Lexical Grammar
			InputElement
				WhiteSpace（空格）
					<TAB>
						制表符
					<VT>
						纵向制表符，大部分情况下对排版不影响。
					<FF>
					<SP>
					<NBSP>
						U+00A0	NO-BREAK SPACE
						<body>
  <!-- 页面换行时，按照哦空格换行 -->
  I learned JavaScript today. I learned JavaScript today. I learned JavaScript today. I learned JavaScript today.
  <!-- 页面换行时，不按照空格换行 -->
  I learned Java Script today. I learned Java Script today. I learned Java&nbsp;Script today. I learned Java&nbsp;Script
  today.
</body>
					<ZWNBSP>
						Zero width no-break space（零宽空格即\ufeff）。属于BOM（Byte order mark）技术。
						如果唉控制台输入'var\uFEFFa = 1'，再将产生的字符串"var﻿a = 1"再输入到控制台，实际也会得到var a = 1的效果。但肉眼可见的var和a之间无空格，实际插入了一个零宽空格。
						部分服务端Bug会将导致将文件的第一个字符按照BOM解析，即会删除头部第一个字符。
					<USP>
						Unicode中的空格，包含了<SP>，前面的部分几种。
				LineTerminator（换行符，回车）
					<LF>
						U+000A LINE FEED (LF) <LF>
							即\n，常用。在Windows下为\r\n。
					<CR>
						U+000D CARRIAGE RETURN (CR) <CR>
							即回车\r
					<LS>
						U+2028 LINE SEPARATOR <LS>
							分行符
					<PS>
						U+2029 PARAGRAPH SEPARATOR <PS>
							分段符
					不推荐使用
					都在ASCII的范围内
				Comment（注释）
					// 当行注释
						以//开头，换行符结束。
					/* 多行注释 */
						注意*无法用\u进行转码。即/* 多行注释 */无法写成/* 多行注释 \u002a/
					/和*不允许使用Unicode
				Token
					Punctuator（符号）
						Punctuator
							{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~
&& || ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= =>
						DivPunctuator
							/
							/=
						RightBracePunctuator
							}
					IdentifierName（标识符）
						变量名
							如var a中的a，document.write中的document，不能和关键字重名
							undefined是个变量，不是关键字，可在局部作用域中声明变量，并修改值。
						属性名
							如document.write中的write，可以和关键字重名
							get不是关键字，但在对象中起到了关键字的作用，如{ get a{ return 1 }, get: 1 }，但get还是可以用作变量名。
							document.body.className属性，却可以通过document.body.setAttribute('class')设置，是为了避免class关键字的使用，在ECMAScript 3中会报错，但现行版本已经修复此问题，即用可以在属性名中使用关键字来规避。
						Keyword（关键字）
							await break case catch class const continue debugger default delete do
else export extends finally for function if import in instanceof new
return super switch this throw try typeof var void while with yield
						Future Reserved Words
							enum
						IdentifierStart
							UnicodeIDStart
								any Unicode code point with the Unicode property “ID_Start”
							$
							_
							\ UnicodeEscapeSequence
						IdentifierName IdentifierPart
							UnicodeIDContinue
								any Unicode code point with the Unicode property “ID_Continue”
								下划线_也在其中。
							$
							\ UnicodeEscapeSequence
							<ZWNJ>
								零宽非连接符
							<ZWJ>
								零宽连接符
						如var a中的a，document.write中的document和write。
					Literal
						NumericLiteral
						StringLiteral
						Template
					标记，指JavaScript中一切有效的内容。除了它之外3种内容，删除之后也不会对代码产生影响。
					帮助程序形成结构
					由开发人员编写，构成代码的有效信息。
				在文档中，JavaScript拥有4个顶级输入元素，是为了处理除号、字符串模板、正则表达式之间的冲突。
对于使用者来说，可以认为只有一种顶级输入元素，是为了更好地处理产生式。
			InputElementRegExp
			InputElementRegExpOrTemplateTail
			InputElementTemplateTail
			词法分析阶段，查找下列4种输入信息，即4种顶级元素。
		11.8 Literals
			Number
				DecimalLiteral
					0
					0.
					.2
					1e3
					不支持0开头的数字，如010
					不支持负数
				BinaryIntegerLiteral
					0b111
				OctalIntegerLiteral
					0o10
				HexIntegerLiteral
					0xFF
				LegacyOctalIntegerLiteral
				97.toString()，要写成97 .toString()，避免.被当做小数点
				作业：写一个正则表达式 匹配所有 Number 直接量（根据标准中的NumericLiteral部分写）
				注意点
					Safe Integer
						Number.MAX_SAFE_INTEGER.toString(16)
"1fffffffffffff"
					Float Compare
						Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
							最安全的比较，是转换成整数。部分银行使用超高精度浮点数比较，但也不能保证绝对安全。
			String
				Character（字符）
					ASCII
					Unicode
					UCS	U+0000 - U+FFFF
						即BMP字符
					GB
						GB2312
						GBK（GB13000）
						GB18030
						只收入了ASCII字符和中文字符
					ISO8859
						欧洲国家的标准
					BIG5
						台湾繁体中文
					97.toString()会报错，因为97JavaScript是一个合法的Number，在词法分析时，会优先将 . 当做一个小数点处理。
可以写成97 .toString()，即可规避此问题。
				Code Point（码点）
				Encoding
					UTF
						UTF8
							占用2个字节。但在存储BMP之外字符时，由于引入了控制位，实际存储的是3个字符。
							作业：
String—Homework
function UTF8_Encoding(string){
//return new Buffer();
}
						UTF16
							JavaScript实际使用的
							占用4个字节
						UTF32
							消耗内存空间，基本不用。
				Grammar
					'abc'
						SingleStringCharacters
					"abc"
						DoubleStringCharacter
					`abc`
						作业：
String—Grammar Chanllenge
A regular Expression to match string literal.
						为了处理{和}，也就是说在字符串模板内部不可以有}，为了处理这部分，就需要设置字符串模板的顶级输入元素。
						`I said: "${
  word
}"`
							会被解析成3部分，每行是一部分
						`I said: "${
  word1
}", "${
  word2
}"`
							会被解析成5部分，每行是一部分
					单双引号字符串的特性
						SourceCharacter but not one of " or \ or LineTerminator
						<LS>
						<PS>
						\ EscapeSequence
							EscapeSequence
								CharacterEscapeSequence
								0 [lookahead ∉ DecimalDigit]
								HexEscapeSequence
									"\x38"即8
								UnicodeEscapeSequence
									"\u0038"即8
								SingleEscapeCharacter
									' " \ b f n r t v
										\b 0x0008 BACKSPACE <BS>
											大部分情况下没用
										\t 0x0009 CHARACTER TABULATION <HT>
										\n 0x000A LINE FEED (LF) <LF>
										\v 0x000B LINE TABULATION <VT>
										\f 0x000C FORM FEED (FF) <FF>
										\r 0x000D CARRIAGE RETURN (CR) <CR>
										\" 0x0022 QUOTATION MARK "
										\' 0x0027 APOSTROPHE '
										\\ 0x005C REVERSE SOLIDUS \
						LineContinuation
			Boolean
				true
				false
			Object
			Null
			Undefined
			Symbol
		正则表达式直接量
			var a;
a
/a/g
这段代码会被认为是a/a/g，即1/a
				由于此时的除号与正则的冲突很难处理，加上字符串模板的问题，造成JavaScript规范必须将顶级输入元素拆分成4种。