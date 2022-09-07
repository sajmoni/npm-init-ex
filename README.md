# npm-init-ex

npm init extended - a better `npm init`

```sh
npx npm-init-ex
```

## Features

Runs `npm init -y` and then modifies the `package.json`:

- Sets version to `0.0.0` (Better for `np`)
- Sets license to `MIT`
- Adds a `main`, `bin` and `files` fields (Assumes a `dist` folder)
- Sets `node` in `engines` to `>16`
- Sorts the fields
- Adds `type: "module"`

Also creates an `.npmrc` files with `save-exact=true`
