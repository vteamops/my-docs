# Git & GitHub Overview

Pull, Fetch, Commit, Push, Merge, Rebase – have these terms have managed to make their way into your everyday lives yet? When Linus Torvalds created his very first version of Git, he described it as “the stupid content tracker”. Fast-forward to today, this free open-source software is now the most popular version control system.

## What is Git?

Git is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It allows multiple developers to work together on the same codebase, tracking changes and managing different versions of files.

---

## Key Features of Git

- **Distributed Development:** Each developer has a full copy of the repository
- **Branching and Merging:** Create separate branches for features/fixes
- **Version History:** Track all changes and revert when needed
- **Collaboration:** Multiple developers can work simultaneously
- **Data Integrity:** SHA-1 hash ensures content safety

---

## What is GitHub?

GitHub is a web-based hosting service for Git repositories. It provides:
- A centralized location for storing Git repositories
- Collaboration features like Pull Requests and Issues
- Project management tools
- Continuous Integration/Deployment capabilities
- Community features for open source projects

---

![Git Central](../../images/Git-distributed-architecture.png)

![Git Local & Centralized](../../images/Git-Local-Remote-Architecture.png)

TLDR:

- **Working directory:** where we edit files
- **Staging area:** a temporary location where files are kept for the next commit
- **Local repository:** contains the code that has been committed
- **Remote repository:** the remote server that stores the code

# Git Team Collaboration Commands

## Daily Team Workflow

```shell
# Get latest changes from remote
git fetch origin                # Fetch all branches
git pull origin main           # Pull main branch updates

# Create feature branch
git checkout -b feature/name    # Create and switch to feature branch
git push -u origin feature/name # Push branch to remote

# Share your changes
git add .                      # Stage changes
git commit -m "feat: add xyz"  # Commit with conventional commit message
git push                       # Push to your branch

# Review others' changes
git fetch origin              # Get latest branches
git checkout feature/review   # Switch to colleague's branch
git pull origin feature/review # Get latest changes
```

## Code Review & Merge

```bash
# Before merging
git checkout main             # Switch to main
git pull origin main         # Get latest main
git checkout feature/name    # Back to feature branch
git merge main              # Merge main into feature branch
git push                    # Push merged changes

# After PR approval
git checkout main           # Switch to main
git merge feature/name     # Merge feature into main
git push origin main      # Push to remote main
```

## Resolve Conflicts

```bash
# When conflicts occur
git status                  # Check conflicted files
git merge --abort          # Cancel merge if needed

# Resolve and complete merge
git add <resolved-files>   # Stage resolved files
git commit                # Complete the merge
git push                 # Push merged changes
```

## Team Synchronization

```bash
# Update your repository
git remote update          # Update remote branches
git remote prune origin   # Clean up deleted remote branches

# Check team progress
git branch -a             # List all branches
git log --oneline --graph # View branch history
git shortlog -sn         # See team contributions
```

## Best Practices for Teams

```bash
# Keep your branch updated
git checkout feature/name  # Your feature branch
git fetch origin          # Get remote updates
git merge origin/main     # Merge main into your branch

# Clean up after merge
git branch -d feature/name    # Delete local branch
git push origin -d feature/name # Delete remote branch

# Tag releases
git tag -a v1.0.0 -m "Version 1.0.0"  # Create tag
git push origin v1.0.0                # Push tag
```
