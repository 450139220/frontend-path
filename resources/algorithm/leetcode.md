# LEETCODE

---

### 1(1).twoSum

自己实现：O(n²)

>  双循环

优解：O(n)

> hashmap，
>
> 键为数组中的值，值为数组中的索引

---

### 2(283).moveZeros

自己实现：不会

优解：O(n)

> 双指针，
>
> 左边指向0则右边一直走，
>
> 左边非0则和右边一起走

---

### 3(160).getIntersectionNode

自己实现：不会

优解：O(n + m)

> 把两个链表拼一起，
>
> 各是各的起点，
>
> 但总长度相等，
>
> 最终总会有相交，
>
> 否则就是永不相交

---

### 4(206).reverseList

自己实现：不会

优解：O(n)

> 直接把上一个和下一个存下来，
>
> 让当前的 `next` 为上一个，
>
> 然后当前跳到下一个

---

### 5(234).isPalindrome

自己实现：不会

简单解：O(n) + O(n)

> 将链表转为数组，
>
> 数组处理回文一个双指针就够了

优解：O(n) + O(1)

> 快慢指针找中点，
>
> 反转后半部分链表，
>
> 两个部分同时前进并比较

---

### 6(141).hasCycle

自己实现：不会

简单解：O(n) + O(n)

> 用一个哈希表所有链表元素，
>
> 循环整个链表，
>
> 如果哈希表中有某元素则为循环，
>
> 否则循环会结束并返回false

优解：O(n) + O(1)

> 快慢指针，
>
> 如果循环则两个指针终将相遇

---

### 7(21).mergeTwoLists

自己实现：不会

优解：O(n + m) + O(1)

> 用一个哨兵当头部一直等待后面迭代，
>
> 循环比较l1和l2哪个更小，
>
> 小的则未哨兵替代变量的next，
>
> 且哨兵和l同时走一步

---

### 8(94).inorderTraversal

自己实现：忘了

普通解：O(n) + O(n)

> 递归调用中序遍历

---

### 9(104).maxDepth

自己实现：不会

普通解：O(n) + O(height)

> 深度优先搜索，
>
> 递归调用并返回当前深度，
>
> 初始为0，
>
> 即 `root === null` 时为0

---

### 10(226).invertTree

自己实现：O(n) + O(n)

优解：🎊 自己实现的优解！

> 从头到脚递归交换

---

### 11(101).isSymmetric

自己实现：不会

优解：O(n) + O(n)

> 用两个指针指向 `root` 的两个子节点，
>
> 分别往反方向移动，
>
> p往右则q往左，p往左则q往右，
>
> 记得判断边界情况

---

### 12(543).diameterOfBinaryTree

自己实现：不会

优解：O(n) + O(height)

> 深度优先搜索来获取两侧子节点的最大长度，
>
> 将答案与最长节点距离之和比较来保证答案为最长节点距离之和

---
