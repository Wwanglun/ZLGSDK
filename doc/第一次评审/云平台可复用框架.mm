<map>
		<node ID="root" TEXT="云平台可复用框架-web端">		<node TEXT="代码review" ID="16a16d6777af0d0d2" STYLE="bubble" POSITION="right">
		<node TEXT="登录模块" ID="1e416d6777db330e7" STYLE="fork">
		<node TEXT="element-ui的form表单校验函数可以单独提取出来，给登录，注册，忘记密码复用。" ID="1e016d6777e07d05b1" STYLE="fork">
		</node>
		</node>
		<node TEXT="首页" ID="27516d6777e07d16e2" STYLE="fork">
		</node>
		<node TEXT="个人中心模块" ID="3ab16d6777e07d183" STYLE="fork">
		<node TEXT="上传头像的格式建议优化，因匹配不到Png,或者Bmp这种大小写掺杂的图片格式" ID="9516d6777e07d0574" STYLE="fork">
		</node>
		<node TEXT="用户信息展示目前都是硬编码，而不是根据用户信息动态展示" ID="2c416d6777e07d1255" STYLE="fork">
		</node>
		<node TEXT="点击编辑密码框之后，导致项目卡死，无法运行" ID="28316d6777e07d0026" STYLE="fork">
		</node>
		</node>
		<node TEXT="数据模块" ID="2f516d6777e07d12b7" STYLE="fork">
		<node TEXT="table表格表头的数据，可以直接用变量动态配置渲染，不用硬编码复制冗余代码" ID="36416d6777e07d14c8" STYLE="fork">
		</node>
		<node TEXT="时间搜索组件可以封装成一个单独的组件" ID="1ac16d6777e07d119" STYLE="fork">
		</node>
		</node>
		<node TEXT="设备模块" ID="3a316d6777e07d03b10" STYLE="fork">
		<node TEXT="DeviceOverviewArea.vue 文件中propsList变量命名不符合规范" ID="1a16d6777e07d14c11" STYLE="fork">
		</node>
		</node>
		<node TEXT="公共组件模块" ID="d916d6777e07d0412" STYLE="fork">
		<node TEXT="Text.vue和TextHover.vue可以定义一个css样式类来解决，减少冗余组件" ID="1316d6777e07d0a613" STYLE="fork">
		</node>
		<node TEXT="Text.vue 中type 类型写成了 tyoe，需要修改，且传入的数据都是css样式，建议可以不用枚举，直接写成传入css样式进行动态接收渲染" ID="3c016d6777e07d06b14" STYLE="fork">
		</node>
		<node TEXT="项目样式使用less，可以定义一套全局的less样式，引入到项目的公共部分，用户想要改主题样式的时候，直接修改common.less文件就好" ID="c816d6777e07d06115" STYLE="fork">
		</node>
		<node TEXT="模块的logic中的js中涉及到api接口，可以没必要再封装一层，直接引用sdk中api的js就行" ID="3b416d6777e07d0bc16" STYLE="fork">
		</node>
		<node TEXT="组件的提示文字，尽量不用出现中文在vue文件和js文件里面，可以封装到一个语言文件里面，可以方便翻译成其他语言且复用" ID="b916d6777e07d1717" STYLE="fork">
		</node>
		<node TEXT="在引入第三方仓库的时候，没有配置简要路径符号，导致公共仓库的文件发生变动，要替换项目中所有引入的文件" ID="2db16d6777e07d01318" STYLE="fork">
		</node>
		<node TEXT="third_party 这个文件夹，需要在readme文件中说明，或者在拉取的时候，直接有建立" ID="39c16d6777e07d0fc19" STYLE="fork">
		</node>
		<node TEXT="代码尽量不要出现行内样式，所有的样式尽量都以类名的形式设置，如DeviceTableCtrl.vue里面就有行内样式" ID="3df16d6777e07d15b20" STYLE="fork">
		</node>
		<node TEXT="可以去网上找一些子字体图标，生成字体文件给用户使用" ID="31516d6777e07d03321" STYLE="fork">
		</node>
		<node TEXT="组件的图片资源，应该按照模块或者界面分类区分，图片文件暂时没有带模块前缀或者按界面区分" ID="33416d6777e07d12722" STYLE="fork">
		</node>
		<node TEXT="函数click命名问题，应该是@click=&quot;showPasswordClick&quot;&nbsp; &nbsp;click在前，而不是以click为后缀结尾" ID="1d116d6777e07d17d23" STYLE="fork">
		</node>
		<node TEXT="webSocketUtils.js这个文件的命名定位和里面的函数内容不一致" ID="1b816d6777e07d10924" STYLE="fork">
		</node>
		<node TEXT="每个模块的示例数据可以在每个组件模块下新建一个mockdata文件夹，用来存放示例数据，而不用把示例数据写入vue文件中，把数据和组件进行解耦" ID="716d6777e07d01825" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="功能测试问题记录" ID="35516d6777f9f102a" STYLE="bubble" POSITION="right">
		<node TEXT="登录模块" ID="2d116d6778198a02d" STYLE="fork">
		<node TEXT="登录界面 记住密码功能失效" ID="24f16d6778ff6113f" STYLE="fork">
		</node>
		<node TEXT="没有检查登录机制，如果不访问login路由，则界面会显示空白" ID="26a16d677a5ba109b" STYLE="fork">
		</node>
		<node TEXT="登录界面 在输完密码，按enter键无法登录" ID="4716d677bfb2b0a9" STYLE="fork">
		</node>
		<node TEXT="注册界面的  可点击字体有颜色提示，可是登录的界面的点击注册字体没有颜色提示" ID="13916d677c449f04d" STYLE="fork">
		</node>
		</node>
		<node TEXT="首页" ID="2716d67806155027" STYLE="fork">
		<node TEXT="头部的字体鼠标移上去有晃动的感觉，体验不好。建议改成鼠标移上去字体变大且变颜色，但是旁边的字体固定不动；监控大屏建议去掉，其他的消息、日志、记录功能定位不明确。" ID="15316d678078a203a" STYLE="fork">
		</node>
		<node TEXT="点击头部的logo建议跳转到首页的功能" ID="2e616d6782682e048" STYLE="fork">
		</node>
		<node TEXT="左侧菜单可以自动检测界面屏幕的宽度，自定收缩功能" ID="3c316d67851aa90d2" STYLE="fork">
		</node>
		<node TEXT="系统设置中，切换主题颜色有问题，切换菜单有问题，中英文切换无法使用" ID="1e016d679806c7146" STYLE="fork">
		</node>
		</node>
		<node TEXT="个人中心模块" ID="2a416d67785fac0eb" STYLE="fork">
		<node TEXT="功能充值功能无法使用" ID="12916d679775df0af" STYLE="fork">
		</node>
		<node TEXT="用户信息无法编辑" ID="28616d6797a3e8157" STYLE="fork">
		</node>
		</node>
		<node TEXT="数据模块" ID="30416d6778ba9d1364" STYLE="fork">
		<node TEXT="实时数据表格无法根据设备类型动态展示，选择设备、清空、暂停无法使用" ID="c316d6795c21811a" STYLE="fork">
		</node>
		<node TEXT="历史数据界面接口请求报错，功能无法使用" ID="17816d679602d207e" STYLE="fork">
		</node>
		</node>
		<node TEXT="设备模块" ID="1616d6778ba9d0f87" STYLE="fork">
		<node TEXT="设备列表的搜索设备，删除设备，添加设备功能无法使用" ID="34e16d679411dc0eb" STYLE="fork">
		</node>
		</node>
		<node TEXT="公共组件模块" ID="b116d7abeb69114b" STYLE="fork">
		<node TEXT="冒号统一使用中文的冒号，目前界面都是书写的英文冒号" ID="2d916d7abedec010a" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="功能规划" ID="10c16d6798e5eb0b" STYLE="bubble" POSITION="left">
		<node TEXT="已有功能" ID="4316d679902210dd" STYLE="fork">
		<node TEXT="登录模块" ID="34516d67cadd39027" STYLE="fork">
		<node TEXT="登录" ID="12c16d67cb2eaa1161" STYLE="fork">
		<node TEXT="动态设置项目名和项目logo" ID="2db16d67cb2eaa172" STYLE="fork">
		</node>
		<node TEXT="动态设置背景色" ID="36316d67cb2eaa1333" STYLE="fork">
		</node>
		<node TEXT="忘记密码" ID="1cf16d67cb2eaa0364" STYLE="fork">
		</node>
		<node TEXT="体验账号" ID="2b316d67cb2eaa01f5" STYLE="fork">
		<node TEXT="动态显示/隐藏，隐藏时登录按钮沾满一行。" ID="2ef16d67cb2eaa0b96" STYLE="fork">
		</node>
		<node TEXT="动态设置体验账号的用户名和密码" ID="2516d67cb2eaa0417" STYLE="fork">
		</node>
		</node>
		<node TEXT="用户输入校验" ID="ae16d67cb2eaa1328" STYLE="fork">
		</node>
		</node>
		<node TEXT="注册" ID="1b616d67cb2eaa0b69" STYLE="fork">
		<node TEXT="动态设置项目名和项目logo" ID="ae16d67cb2eaa10" STYLE="fork">
		</node>
		<node TEXT="用户输入校验" ID="1d516d67cb2eaa15811" STYLE="fork">
		</node>
		</node>
		<node TEXT="第三方登录" ID="18d16d67cb2eaa0f212" STYLE="fork">
		<node TEXT="动态显示/隐藏" ID="e316d67cb2eaa12213" STYLE="fork">
		</node>
		<node TEXT="动态各登录平台设置图标" ID="14616d67cb2eaa17314" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="主界面模块" ID="28f16d67cb2eaa0cc15" STYLE="fork">
		<node TEXT="Header" ID="19816d67cb2eaa0ef16" STYLE="fork">
		<node TEXT="动态设置项目名" ID="1dc16d67cb2eaa0ac17" STYLE="fork">
		</node>
		<node TEXT="动态设置菜单栏图标" ID="3a316d67cb2eaa09418" STYLE="fork">
		</node>
		<node TEXT="动态增删各页签功能栏" ID="3d416d67cb2eaa10419" STYLE="fork">
		</node>
		<node TEXT="切换主题色" ID="39816d67cb2eaa0f720" STYLE="fork">
		</node>
		<node TEXT="切换中英文" ID="1ee16d67cb2eaa0bd21" STYLE="fork">
		</node>
		<node TEXT="用户中心" ID="18c16d67cb2eaa0ed22" STYLE="fork">
		<node TEXT="用户中心" ID="33716d67cb2eaa05e23" STYLE="fork">
		</node>
		<node TEXT="退出" ID="27e16d67cb2eaa07e24" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="Main" ID="ad16d67cb2eaa11625" STYLE="fork">
		<node TEXT="主界面布局" ID="17f16d67cb2eaa10526" STYLE="fork">
		</node>
		</node>
		<node TEXT="Aside" ID="2e816d67cb2eaa0ff27" STYLE="fork">
		<node TEXT="动态设置菜单栏图标" ID="1bd16d67cb2eaa15b28" STYLE="fork">
		</node>
		<node TEXT="动态设置菜单栏文本" ID="15c16d67cb2eaa12329" STYLE="fork">
		</node>
		<node TEXT="动态设置切换菜单路由" ID="2a216d67cb2eaa0a730" STYLE="fork">
		</node>
		</node>
		<node TEXT="Footer" ID="16c16d67cb2eaa0831" STYLE="fork">
		<node TEXT="公司信息" ID="24e16d67cb2eaa18e32" STYLE="fork">
		</node>
		<node TEXT="联系方式" ID="34716d67cb2eaa0a633" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="用户模块" ID="32316d67cb2eaa0834" STYLE="fork">
		<node TEXT="账号余额" ID="2ba16d67cb2eaa16535" STYLE="fork">
		<node TEXT="用户头像、用户名、账号余额" ID="37716d67cb2eaa03f36" STYLE="fork">
		</node>
		<node TEXT="充值" ID="11216d67cb2eaa0f337" STYLE="fork">
		</node>
		<node TEXT="我的账单" ID="3cc16d67cb2eaa0cd38" STYLE="fork">
		</node>
		</node>
		<node TEXT="用户信息" ID="3b916d67cb2eaa16939" STYLE="fork">
		</node>
		<node TEXT="账号安全" ID="23216d67cb2eaa0b340" STYLE="fork">
		</node>
		</node>
		<node TEXT="设备模块" ID="16a16d67d5ea450be" STYLE="fork">
		<node TEXT="设备列表" ID="28b16d7aabc45f16e" STYLE="fork">
		</node>
		</node>
		<node TEXT="数据模块" ID="8816d67d6038c0f3" STYLE="fork">
		<node TEXT="历史数据" ID="28616d7aabe03f054" STYLE="fork">
		</node>
		<node TEXT="实时数据" ID="21616d7aabf27a08b" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="建议新增功能" ID="11816d679917b0104" STYLE="fork">
		<node TEXT="设备模块" ID="cf16d67cb6aba03d" STYLE="fork">
		<node TEXT="设备类型界面" ID="31016d67cee76d176" STYLE="fork">
		<node TEXT="增、删、查、改功能" ID="35916d67cf877d0d2" STYLE="fork">
		</node>
		</node>
		<node TEXT="设备列表-设备详情" ID="2ac16d67cefe870e9" STYLE="fork">
		<node TEXT="设备命令控制（命令根据设备类型配置进行渲染）" ID="25916d67cfbfbc086" STYLE="fork">
		</node>
		<node TEXT="设备状态数据渲染" ID="16b16d67d0e68d013" STYLE="fork">
		</node>
		</node>
		<node TEXT="设备日志" ID="3e16d67cf32c70f" STYLE="fork">
		<node TEXT="动态渲染设备日志表格列" ID="7016d67d2452b014" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="数据管理-数据大盘" ID="13016d67cba12606c" STYLE="fork">
		<node TEXT="功能同云平台一致" ID="14a16d67d66f4c12d" STYLE="fork">
		</node>
		</node>
		<node TEXT="系统日志界面" ID="24e16d67cebf8d043" STYLE="fork">
		<node TEXT="功能同云平台一致" ID="7716d67d6a59012" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="demo建议删除功能" ID="3ac16d67d3cb9b149" STYLE="fork">
		<node TEXT="角色管理" ID="1f16d67d4020303f" STYLE="fork">
		</node>
		<node TEXT="监控大屏" ID="39116d67d4a3fb01e" STYLE="fork">
		</node>
		<node TEXT="消息" ID="2a016d67d4b4c2034" STYLE="fork">
		</node>
		<node TEXT="记录" ID="12e16d67d4d740016" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="服务器端的接口说明文档" ID="34a16d67d19dd70c5" STYLE="bubble" POSITION="left">
		<node TEXT="子用户权限相关接口相关详细说明" ID="12016d67d1b5c009c" STYLE="fork">
		</node>
		</node>
</node>
</map>