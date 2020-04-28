# get-pr-commits

A GitHub Action that get commits in current pull-request

## Usage
Add .github/workflows/sanity-check.yml with the following:

```
name: Sanity check
on: [pull_request]

jobs:
  commits_check_job:
    runs-on: ubuntu-latest
    name: Commits Check
    steps:
    - name: Get PR Commits
      id: 'get-pr-commits'
      uses: tim-actions/get-pr-commits@master
      with:
        token: ${{ secrets.GITHUB_TOKEN }}

```
