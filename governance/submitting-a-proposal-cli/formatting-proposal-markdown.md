# Formatting Proposal Markdown

In the CLI, the description accepts markdown text but it must be converted to a single line. This python script helps to convert some text into a single line description.

```python
proposal_text = f"""
# Proposal Title Here
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

---

Ut enim ad minim veniam, 
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

---

## Voting Options

YES: Agree to with this proposal.

NO: Disagree with the proposal.

NO WITH VETO: Disagree with the proposal and want depositors penalized.

ABSTAIN: Decline to give an opinion on the proposal.

"""

res = proposal_text.replace("\n", "\\n")
res = res.replace("’", "'")      # when you copy paste from the web
res = res.replace('"', '\\"')
res = res.replace("`", "'") 
res = res.replace("    ", "\\t") # tabs
print("=" * 20)

if res.startswith("\\n"):
    res = res[2:]
if res.endswith("\\n"):
    res = res[:-2]

# Then take this description into the proposal JSON
print(res)
```
