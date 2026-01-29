# TODO: Refactor quiz.js to use unified ProgressManager

## Steps to Complete

- [x] Remove custom progress functions (saveProgress, loadProgress, clearProgress) from quiz.js
- [x] Import ProgressManager class from '../../components/progress-manager.js'
- [x] Initialize ProgressManager instance for 'kids-eco-quiz'
- [x] Update startQuiz() to use progressManager.clearProgress()
- [x] Update resumeQuiz() to use progressManager.loadProgress()
- [x] Update selectOption() to use progressManager.saveProgress()
- [x] Update showResult() to use progressManager.clearProgress()
