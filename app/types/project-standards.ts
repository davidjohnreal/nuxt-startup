export type StandardArea = 'naming' | 'types' | 'eslint' | 'git' | 'boundary'

export interface ProjectStandard {
  area: StandardArea
  title: string
  pathExample: string
  rule: string
  why: string
}

export interface CommitExample {
  type: 'feat' | 'fix' | 'docs' | 'refactor' | 'test' | 'chore'
  scope: string
  message: string
}
