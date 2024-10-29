
# Contributing

  

## Pull Request

1. Update the README.md with details of changes, this includes new feature description, dependencies, screenshorts.

2. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.

3. Remember to check the base, head repository and branch when creating a pull request.

4. You are encourage to use the given PULL-REQUEST-TEMPLATE.md in order to keep it consistent and clear.

  
  

## Feature Request

- Create a new branch for a new feature or subfeatures. The branch name should be followed the naming convention rules belows:

1.  **Feature branches:** These branches are used for developing new features. Use the prefix `feature/`. For instance, `feature/login-system`.

2.  **Bugfix branches:** These branches are used to fix bugs in the code. Use the prefix `bugfix/`. For example, `bugfix/header-styling`.

3.  **Release branches:** These branches are used to prepare for a new production release. They allow for last-minute dotting of i’s and crossing t’s. Use the prefix `release/`. For example, `release/v1.0.1`.

4.  **Documentation branches:** These branches are used to write, update, or fix documentation. Use the prefix `docs/`. For instance, `docs/api-endpoints`.

  

## Commit Message

- The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- Type:

	-   **feat**: A new feature

	-   **fix**: A bug fix

	-   **docs**: Documentation only changes

	-	**action**: Version control actions

- Optional scope: based on the feature that you are working on, e.g., **authentication, blog.**

- Description: short informative summary of the commit. Note:
	- Use the imperative, present tense: “change” not “changed” nor “changes”
	- Don’t capitalize first letter
	- No dot (.) at the end

- Optional body: the body should include the motivation for the change and contrast this with previous behavior.

- Optional footer(s): the footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

  

## Coding Style

- Here is some NextJS’s recommended naming conventions for files and folders that you should follow when working on this project:

- According to the package naming guidelines, package names must be **all lowercase** and must include **hyphen** (-) to separate multiple words. For instance, `feature/my-home-page`.

- File names should contain **singular nouns**, e.g., consider designating a file `user.dart` rather than `users.dart` if it specifies a model class for a user.

-  **PascalCase** should be used for class and components, e.g., `ShoppingCartWidget` or `CartWidget`maybe appropriate names for a custom widget that represents a shopping cart.

- File Names with **Prefixes** for Related Components, e.g.,`chat_screen.dart`, `chat_message.dart`, and `chat_constants.dart` for files relating to chat functionality.


## Code of Conduct

Specifically:

- Respect people, their identities, their culture, and their work.

- Be kind. Be courteous. Be welcoming.

- Listen. Consider and acknowledge people's points before responding.