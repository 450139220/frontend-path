好的，下面是**数据库重要基础知识**的精简梳理，适合你这种“实战有一点，基础需补全”的情况👇

------

### 一、数据库三要素（最重要的三种对象）



| 概念                | 说明                               |
| ------------------- | ---------------------------------- |
| 表（Table）         | 存储数据的地方，每张表一类数据     |
| 主键（Primary Key） | 唯一标识一条记录的字段，比如用户ID |
| 外键（Foreign Key） | 建立表与表之间的关联关系           |

------

### 二、常见约束（保证数据合法性）



| 约束          | 作用示例（字段属性）       |
| ------------- | -------------------------- |
| `PRIMARY KEY` | 主键，唯一且非空           |
| `NOT NULL`    | 不允许为空                 |
| `UNIQUE`      | 值不能重复（但可以为空）   |
| `DEFAULT`     | 没传值时用默认值           |
| `CHECK`       | 检查字段的值，例如年龄 > 0 |
| `FOREIGN KEY` | 外键，引用其他表的主键     |

------

### 三、索引（提高查询速度）

- 索引 = 数据库里的“目录”；
- 默认主键会自动建立索引；
- 适合在**经常被搜索/排序的字段**上建索引；
- 建得太多反而影响写入性能（谨慎使用）。

```sql
CREATE INDEX idx_name ON Student(name); -- 对学生姓名建索引
```

------

### 四、触发器（自动执行的规则）

- 是对某张表的“自动监听器”；
- 在 `INSERT` / `UPDATE` / `DELETE` 时触发；
- 可用于记录日志、同步数据、自动检查。

```sql
CREATE TRIGGER trg_check_score
BEFORE INSERT ON Enrollment
FOR EACH ROW
BEGIN
  IF NEW.score < 0 OR NEW.score > 100 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '成绩不合法';
  END IF;
END;
```

------

### 五、事务（保证数据一致）

事务 = 一组 SQL 要么都成功，要么都失败。

关键语句：

```sql
START TRANSACTION; -- 开始
UPDATE ...; DELETE ...;
COMMIT;  -- 提交
ROLLBACK; -- 回滚（出错时用）
```

------

### 六、数据库基本操作命令（回顾）

```sql
-- 建库/删库
CREATE DATABASE mydb;
DROP DATABASE mydb;

-- 选库
USE mydb;

-- 建表
CREATE TABLE ...;

-- 插入
INSERT INTO table_name (...) VALUES (...);

-- 查询
SELECT * FROM table_name;

-- 更新
UPDATE table_name SET ... WHERE ...;

-- 删除
DELETE FROM table_name WHERE ...;
```

------
