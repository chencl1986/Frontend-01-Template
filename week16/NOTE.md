# 学习总结

1. 作业在componentWithAnimationGestureInClass文件夹中。
2. 老师在Gesture中，用dispatchEvent派发事件的方式处理，这是我以前没有用过的方式，觉得眼前一亮。而且dispatchEvent确实也使代码更加灵活和简洁。最近因为工作原因，接触了UEditor的代码，其中也是通过类似方式处理了事件，本周的课程对我修改UEditor源码实现需求提供了很好的思路。
3. 以前在日常开发中，总是用扩展运算符（...）代替Object.assign，但在dispatchEvent的时候，使用（...）给CustomEvent添加参数，却造成了报错。才知道自己以前并没有真正理解二者之间的区别，很多时候可能都用错了。
4. 上节课的作业中，我在TimeLine中加入了loop的配置，但在课程中老师对此进行了纠正。我之前倒是没有考虑过TimeLine其实是一个持续存在的时间线，而不应该有Loop的操作。
5. 老师在播放结束后，虽然在animations中移除了动画，但却又将其存入了finishedAnimations。实际上还是没有解决随着循环播放，动画越积越多的问题，我还没有想到更好的解决办法，这个可以再讨论讨论。
