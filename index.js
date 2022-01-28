const core = require('@actions/core')
const github = require('@actions/github')

const validEvent = ['pull_request']

async function main() {
  try {
    const { eventName, payload: {repository: repo, pull_request: pr} } = github.context

    if (validEvent.indexOf(eventName) < 0) {
      core.error(`Invalid event: ${eventName}`)
      return
    }

    const token = core.getInput('token')
    const filterOutPattern = core.getInput('filter_out_pattern')
    const filterOutFlags = core.getInput('filter_out_flags')
    const octokit = new github.GitHub(token)

    const commitsListed = await octokit.pulls.listCommits({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pr.number,
    })

    let commits = commitsListed.data

    if (filterOutPattern) {
      const regex = new RegExp(filterOutPattern, filterOutFlags)
      commits = commits.filter(({commit}) => {
        return !regex.test(commit.message)
      })
    }

    core.setOutput('commits', JSON.stringify(commits))
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
