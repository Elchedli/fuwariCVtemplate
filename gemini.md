# Engineering Rules
- Anytime the engineer starts a command with `\<prompt>`, look for the file and execute the command:
  - **Skill Prompts**: `\<skill>.md "<prompt>"` maps to `.claude/skills/<prompt>.md`
  - Properly fill in the variables in the command based on the `argument-hint` in the command file if it exists