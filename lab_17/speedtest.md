| n | operation | time |
| :---: | --- | :---: |
| 1 | set(n, 'setn'), n = 1..10000 | 690 ms |
| 2 | get(n), n = 1..10000 | 598 ms |
| 3 | del(n), n = 1..10000 | 572 ms |
| 4 | incr('incr'), n = 1..10000 | 596 ms |
| 5 | decr('decr'), n = 1..10000 | 518 ms |
| 6 | hset('hset', n, '{ id: n, val: "val - n" }'), n = 1..10000 | 626 ms |
| 7 | hget('hget', n), n = 1..10000 | 550 ms |
