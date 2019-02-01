# git
 test
## git原理解析

## git命令行

1. 新建分支
   建议每次开发新功能，都新建单独的分支
   获取主干代码，一般来说，通过git clone命令，就已经再主分支上。如果你需要再在新的子分支上进行开发，需要切换分支，再在子分支上新建开发分支。

   ```
   // 获取主干最新代码
   git checkout master
   git pull
   // 新建开发分支，此处是在主分支上新建的开发分支
   git checkout -b myfeature
   // 此命令相当于
   git branch myfeature // 新建分支
   git checkout myfeature // 切换到新分支
   ```

2. 提交分支commit
   分支修改后，可以提交commit

   ```
   git add --all // 从git2.0，all是git add的默认参数；可用git add .，代表保存所有的变化，包括新建、修改、删除文件
   git status // 用来查看发生变动的文件
   git commit // 后面跟一些参数
   ```

3. 与主干同步
   分支开发过程中，经常与主干保持同步

   ```
   git fetch origin
   git rebase origin/master
   ```

4. 合并commit
   开发完成后，可能有一堆的commit，但是合并到主干时，希望只有一个。
   多个commit合并，可以使用git rebase命令

   ```
   git rebase -i origin/mater
   ```

   此命令会列出当前分支的所有commit，越往下月薪。每个commit前面都有一个操作命令，默认是pick，表示该行commit被选中，要进行rebase操作。

   ```
   pick：正常选中
   reword：选中，并且修改提交信息
   edit：选中，rebase时会暂停，允许你修改这个commit
   squash：选中，会将当前commit与上一个commit合并
   fixup：与squash相同，但是不会保存当前commit的提交信息
   exec：执行其他shell命令
   ```

   squash和fixup可以用来合并commit。先把需要合并的commit前面的动词改成squash（或者s）执行后，当前分支只会剩下其余的commit，而合并的分支会合并到最新的commit。

### 命令行

#### git reflog

git reset --hard 



冲突

git rebase master

 git rebase --continue

