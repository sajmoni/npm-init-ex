# npm-init-ex

> npm init extended - a better `npm init`

```sh
npx npm-init-ex@latest
```

## :sparkles: Features

1. Runs `npm init -y`

2. Modifies the `package.json`

- Sets version to `0.0.0` (Better for [`np`](https://github.com/sindresorhus/np))
- Sets license to `MIT`
- Adds `main`, `bin` and `files` fields (Assumes a `dist` folder)
- Sets `node` in `engines` to `>18`
- Adds `type: "module"`
- Sorts the fields

3. Creates `.npmrc` with `save-exact=true`
