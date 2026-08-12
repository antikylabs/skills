Ok take a look at @../../emberwyrd/antikySite/docs/objectives/ especially the one under scratch/demo-refining, skill-research, inspection-tooling, etc...

We want an objectives skill with following commands:

- init | scaffold => creates folder under docs/objectives/<name>/ with objective.md for user to dump thoughts into for the objective.
- generate-research-plan | create-research => uses objective.md to generate a plan to execute with /goal to do research and fan out subagents to figure out information puts research and subagent outputs into docs/objectives/<name>/research/.
- compile-research-to-plan | create-plan => uses the `research/` folder to generate numberd docmunets 00-<title>, 01-<title>, ..., etc.. to outline the plan understanding gaps etc (See demo-refining as good output)
- compile-goals | create-goals => takes research + plan and generates well bounded goals under `docs/objectives/<name>/goals/` called 01-execute-goal.md, 02-execute-goal.md, etc... 
- complete-goal => moves gaol from `goals/` to `goals/_compelte`. 
- complete-objective | creates new summary of the objective, what was done, what was achived etc into `docs/objectives/_archives/`
- audit => spins up a reviewer panel with agents that are specialists in the given area of the objective of 2-3 agents, to critique the plan/goals etc and give remediation. Then main agent remediates goals. used for reflection.
- execute => Executes goal, generates summary afterwards, moves it to complete. Is used in actual `/goal` in format of `/goal /team-write-objectives execute 01-execute-goal.md until complete`. or something like that.


Rules...

```
- /docs/objectives/<name>
  - /research/
    - /subagent_outputs/
      - 00-<agent-name>.md
      - ...
    - /00-<doc-name>.md
    - /...
  - /goals/
    - /_completed/
      - 00-execute-goal.md
      - 00-summary-goal.md
      - 01-execute-goal.md
      - 02-summary-goal.md
      - ...
    - /03-execute-goal.md
    - /04-execute-goal.md
    - /...
  - /objective.md
  - /00-<plan-file>.md
  - /01-<plan-file>.md
  - /0..0-<plan-file.md>
  - /README.md (Generated)
```


Goals should follow format as seen in `scratch/demo-refining` showin in emberwyrd/antikysite/docs folder. 

Goals should be well bounded with clear AC.
Dependencies should be well called out.
It should be clear to human operator what next step is and any input needed from them for a goal before goal kicks off.

Objectives are large arcs of work, epics kindof.

Smaller objectives can be one off small bounded goals under `objectives/goals/<goal-name>/goal.md` etc. They should still follow research->plan->execute->summarize->archive. their archive is `objectives/goals/_complete/<goal-name>/..`. We need a set of subcommands for "simple goals" like this that are not nested in a large objective. Idk if that should be separate skill or managed under this skill router.
