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
    const octokit = new github.GitHub(token)

    const commits = await octokit.pulls.listCommits({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pr.number,
    })

    core.setOutput('commits', JSON.stringify(commits.data))
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
