# GitHub Pull Request Fork to Fork

**GitHub Pull Request Fork to Fork** is a browser extension that simplifies your workflow when working with forked repositories. It adds a new button to create pull requests that target your forked repository directly, ensuring you never mistakenly send pull requests to the original repository.

## Features

- Adds a button for creating pull requests targeting your forked repository.
- Automatically sets the target branch to the default branch of your fork.
- Keeps existing GitHub functionality intact.
- Reduces mistakes and streamlines your workflow.

## Installation

### Google Chrome
1. Download the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/github-pull-request-fork/bhndgindoedbbbecfbjpoleibfnpcomn).
2. Click **Add to Chrome** and confirm the installation.

## Usage

1. Navigate to the forked repository where you want to create a pull request.
2. Click the new button labeled **Create Pull Request to Fork**.
3. The pull request will automatically target your fork's default branch.

## Screenshots

![image](https://github.com/user-attachments/assets/40ea10c6-c44c-4d75-b949-1e73ad931ed9)

## Development

Want to contribute? Here's how you can set up the project for local development:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/github-pull-request-fork-to-fork.git
    cd github-pull-request-fork-to-fork
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Build the extension:
    ```bash
    cd packages/chrome
    pnpm build
    ```

4. Load the extension in your browser:
    - For Chrome: Load the dist directory as an unpacked extension.

## Contributing
Bug reports and feature requests are accepted via GitHub Issues. Pull requests are also welcome. While there are no specific rules set at the moment, rules may be added in the future.

## License
This project is licensed under the MIT License.

## Supported Browsers
- Google Chrome
