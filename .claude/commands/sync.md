---
description: Sync s GitHubom — pull najnovšie commits z claude-code a check stavu
---

Spusti tieto príkazy a krátko mi vypíš výsledok:

```bash
cd ~/assetra-web && git fetch origin && git status && git log --oneline -10 origin/claude-code
```

Ak `lovable` má novšie commity než pri poslednom merge (Lovable medzitým
niečo pushol), upozorni ma a opýtaj sa či to chcem zlúčiť do `claude-code`.

Inak proste povedz "ready" + posledný commit hash, a čakaj na ďalšiu úlohu.
