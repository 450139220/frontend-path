哈希表（Hash Table）是一种**键值对存储**的数据结构，能够在**平均 O(1) 时间内**完成插入、删除和查找操作。以下是对哈希表的原理和 LeetCode 相关题目的总结。

------

## **一、哈希表的基本原理**

### **1. 结构**

- **键值对（Key-Value Pair）**：每个元素由**键（Key）**和**值（Value）**组成。
- **哈希函数（Hash Function）**：将 Key 映射到一个索引（Index）。
- **数组（Bucket）**：哈希表的底层通常是一个数组，通过哈希函数决定数据存放的位置。

### **2. 解决哈希冲突**

哈希冲突：不同的 Key 可能映射到相同的索引。

常见解决方法：

- **链地址法（Chaining）**：数组的每个位置存一个链表，多个冲突的 Key 以链表形式存储。
- **开放地址法（Open Addressing）**：找到下一个空位存放冲突的 Key（如线性探测、二次探测）。

------

## **二、LeetCode 题目总结**

### **1️⃣ 两数之和（LeetCode 1）**

#### **题目**

给定一个数组 `nums` 和一个目标值 `target`，找到两个数，使它们的和等于 `target`，返回它们的索引。

#### **哈希表思路**

- 遍历数组时，把 `nums[i]` 存入哈希表 `map`（键为数字，值为索引）。
- 对于当前数 `num`，查找 `target - num` 是否在 `map` 中，若存在，则找到答案。

```typescript
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>(); // 存储值和索引
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) { // 若差值已在 map 中，返回索引
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i); // 记录当前值和索引
    }
    return [];
}
```

⏳ **时间复杂度**：O(N)
 📦 **空间复杂度**：O(N)（存储哈希表）

------

### **2️⃣ 字母异位词分组（LeetCode 49）**

#### **题目**

给定一个字符串数组 `strs`，将字母相同但顺序不同的字符串分到同一组（字母异位词分组）。

#### **哈希表思路**

- 将每个字符串**排序后**作为 Key，**相同 Key 的字符串归为一组**。

```typescript
function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    for (const str of strs) {
        const key = str.split('').sort().join(''); // 排序后作为哈希 Key
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(str);
    }
    return Array.from(map.values());
}
```

⏳ **时间复杂度**：O(N * K log K)（排序的开销）
 📦 **空间复杂度**：O(N)（存储哈希表）

------

### **3️⃣ 最长连续序列（LeetCode 128）**

#### **题目**

给定一个无序数组 `nums`，找出最长连续元素序列的长度。要求**O(N) 时间复杂度**。

#### **哈希表思路**

- 先将所有元素存入 `Set`（方便 O(1) 查找）。
- 遍历 `nums`，对于**每个可能的起点（前面没有更小的数字）**，向右扩展连续序列。

```typescript
function longestConsecutive(nums: number[]): number {
    const numSet = new Set(nums);
    let longest = 0;
    for (const num of numSet) {
        if (!numSet.has(num - 1)) { // 确保从序列的开头开始
            let currentNum = num;
            let currentStreak = 1;
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            longest = Math.max(longest, currentStreak);
        }
    }
    return longest;
}
```

⏳ **时间复杂度**：O(N)
 📦 **空间复杂度**：O(N)

------

## **三、哈希表的总结**

1. **查询快**：O(1) 时间复杂度，适合查找、去重、统计。
2. **键值存储**：适用于映射关系，如存索引、统计频次、分组等。
3. **哈希冲突**：用链地址法（存链表）或开放地址法（找下一个空位）。
4. **遍历慢**：不像数组有序，需要 O(N) 遍历。

------

## **四、什么时候用哈希表？**

✅ **查找是否存在**：如两数之和、最长序列。
 ✅ **计数和统计**：如字符频率统计、字母异位词分组。
 ✅ **去重**：如最长连续序列。
 🚫 **排序操作多**：如需要频繁排序时，哈希表不如数组或树结构。

------

哈希表是一个**强大且高效的工具**，在实际应用中广泛用于缓存、索引等场景。希望这个总结对你有帮助！💡