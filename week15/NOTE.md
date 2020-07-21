# 学习总结

本周的作业，要求在Carousel中使用课堂封装的Animation，我用其替换了原有的轮播动画，并做了一些修改如下：

1. 处理了设置delay后，在delay的时间内，timingFunction会接收到负数参数的Bug。
2. 修复了restart方法未正常生效的Bug，此处按我的理解，是重新播放已有的动画，因此按照这个方案进行了处理。
3. 为动画的执行过程增加了相应事件，如onStart、onStop、onRestart、onPause、onResume、onAllStop。
4. 增加了对循环播放动画的支持。
5. 为每个动画增加了唯一key值参数，用来为动画做标识。

查看修改内容的方法：

1. 对比\week15\component_after_class_carousel\carousel.js与\week14\component_after_class_carousel\carousel.js两个文件。
2. 对比\week15\component_after_class_carousel\animation.js与\week15\animation\animation.js两个文件。
