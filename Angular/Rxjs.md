# RxJS

将任何变化想象成依据时间维度的事件流

## 操作符

### 创建类操作符

1. from：将数组、Promise、以及Iterable转化为Observable
2. fromEvent：将事件转化为Observable
3. of：接受一系列的数据，并把它们emit出去
4. Interval：Rx.Observable.interval(time)，time为间隔时间
5. Timer：Rx.Observable.timer(time1, time2 )，time1为延迟时间，time2为之后以多少间隔来发送数据(第二个参数可缺省，同时使用效果类似于interval，也就是timer可以比interval多指定一个开始延时时间)

### 转换类操作符

1. map：映射，也就是对原始流中的元素进行处理，映射成另一个元素

   <img src="/Users/anitacao/Library/Application%20Support/typora-user-images/image-20181026234328554.png" width="600">

2. maoTo：相当于map(常量)，映射为一个常数，也就是我只关心事件发生，但是不关心值

3. pluck：

### 工具类操作符

1. do：常用来做调试

### 变换类操作符

1. scan：参数一：function，参数二：初始值(可缺省)，类似于reduce，但是会发出中间的累加值

### 数学类操作符

1. reduce：参数一：function，参数二：初始值(可缺省)，将序列所有的元素累加后发出最后结果

### 过滤类操作符

1. filter：返回为真则放行
2. take：take(3)，取前3个元素
3. first/last：take(1)/最后一个
4. skip：skip(2)，过滤两个元素
5. debounce
6. debounceTime
7. distinct
8. distinctUntilChanged

### 合并类操作符

1. merge
2. concat
3. startwidth
4. combineLatest
5. withLatestFrom
6. zip

### Observable性质

1. 三种状态
   1. next
   2. error
   3. complete
2. 特殊性的：
   1. 永不结束
   2. never：不会发射任何元素，也不会结束
   3. Empt：直接结束不发射
   4. Throw：制造错误，直接进入error状态