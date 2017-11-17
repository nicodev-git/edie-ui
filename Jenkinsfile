node {
    properties: [
    	[$class: 'GitLabConnectionProperty', gitLabConnection: 'https://gitlab.com'],
    	pipelineTriggers([
    		$class: "GitLabPushTrigger",
    		triggerOnPush: true,
    		triggerOnMergeRequest: true,
    		triggerOpenMergeRequestOnPush: "both",
    		triggerOnNoteRequest: true,
    		noteRegex: "REBUILD!",
    		skipWorkInProgressMergeRequest: true,
    		ciSkip: false,
    		setBuildDescription: true,
    		addNoteOnMergeRequest: true,
    		addCiMessage: true,
    		addVoteOnMergeRequest: true,
    		acceptMergeRequestOnSuccess: false,
    		branchFilterType: "NameBasedFilter",
    		targetBranchRegex: "dev",
    		includeBranchesSpec: "dev",
    		excludeBranchesSpec: ""
    	])
    ]

    stage('Build'){
        def branch=env.BRANCH_NAME
        echo "Building ${env.BRANCH_NAME}..."
        checkout scm

        def npm=tool 'nodejs'
        env.PATH = "${npm}/bin:${env.PATH}"
        sh 'cd ui && npm i && npm run build'

        archiveArtifacts artifacts: 'ui/build/**', fingerprint: true
    }
}
