import { execSync } from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';

const logMessage = (
  message,
  color,
  font,
  horizontalLayout,
  verticalLayout,
  width,
  whitespaceBreak,
) =>
  console.log(
    chalk[color](
      figlet.textSync(
        message,
        font,
        horizontalLayout,
        verticalLayout,
        width,
        whitespaceBreak,
      ),
    ),
  );

logMessage('PreCommit Hook', 'blue', 'Ogre', 'default', 'default', 80, false);

const runCommand = (command, successMessage, errorMessage) => {
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green.bold(`✓ ${successMessage}`));
  } catch (error) {
    console.error(chalk.red.bold(`✗ ${errorMessage}`));
    process.exit(1);
  }
};

// 1. Security Check 
runCommand(
  'npm audit',
  'Dependency security check completed successfully!',
  'Vulnerabilities found in dependencies. Correct them before committing.'
)

// 2. Licenses Check
runCommand(
  'npm run check-licenses',
  'Project license verification completed successfully',
  'License issues found. Review and update licenses before committing.'
)

// 3. Type Checking
runCommand(
  'tsc --noEmit',
  'Type-check completed successfully!',
  'Type-checking failed. Fix the errors before committing.'
)

// 4. Lint-Staged (ES-Lint && Prettier)
runCommand(
  'npx lint-staged',
  'Linting and formatting completed successfully!',
  'Errors found by Lint-Staged. Correct and try again.',
);

// 5. Testes
runCommand(
  'npm test',
  'All tests passed!',
  'Some tests failed. Correct and try again.',
);

// 6. Build
runCommand(
  'npm run build',
  'Build completed successfully!',
  'Build failed. Fix the errors before committing.',
);

logMessage('Commit authorized!', 'green', 'Slant', 'full', 'default', 50, true);
