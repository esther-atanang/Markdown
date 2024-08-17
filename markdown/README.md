# Markdown Webapp
### Built with React on Vite

#### Basic Functionality
- Create new files
- Delete a file
- Rename a file
- Preview your markdown

#### Issue with Legacy Browser Support

The application is built on Vite, which supports the latest JavaScript features. However, these features may not be compatible with older legacy browsers.

Specifically:
- I used a top-level `await` syntax, which is not supported on these legacy browsers.
- My goal is to load a file immediately when the user opens the application, such as a welcome file guiding them on how to use the markdown editor.

This feature may not work as intended in legacy browsers due to the lack of support for modern JavaScript features.

#### How to Install on Your Local Machine

1. Git clone the repo.
2. `cd markdown`
3. `npm install`
4. That's it! The application is now installed on your local machine.
