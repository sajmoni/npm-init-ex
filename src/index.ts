#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import { styleText } from 'node:util'

import spawn from 'nano-spawn'
import { readPackage } from 'read-pkg'
import { writePackage } from 'write-pkg'
import sortPackageJson from 'sort-package-json'

const packageJsonOptions = {
  version: '0.0.0',
  license: 'MIT',
  files: ['dist/'],
  main: 'dist/index.js',
  bin: 'dist/index.js',
  type: 'module',
  engines: {
    node: '>=22',
  },
} as const

console.log()
console.log(styleText(['blue', 'bold'], ' npm-init-ex'))
console.log()

try {
  await spawn('npm', ['init', '-y'])

  const packageJson = await readPackage({
    normalize: false,
  })

  const updatedPackageJson = sortPackageJson({
    ...packageJson,
    ...packageJsonOptions,
  })

  // @ts-expect-error - sort-package-json doesn't return a compatible type
  await writePackage(updatedPackageJson)
  await writeFile('.npmrc', 'save-exact=true')

  console.log(` ${styleText('cyan', 'package.json')} created`)
  console.log(
    `   ${styleText('dim', 'Version:')} ${styleText(
      'bold',
      packageJsonOptions.version,
    )}`,
  )
  console.log(
    `   ${styleText('dim', 'License:')} ${styleText(
      'bold',
      packageJsonOptions.license,
    )}`,
  )
  console.log(
    `   ${styleText('dim', 'Engine:')} ${styleText(
      'bold',
      packageJsonOptions.engines.node,
    )}`,
  )
  console.log(
    `   ${styleText('dim', 'Dist folder:')} ${styleText(
      'bold',
      packageJsonOptions.files[0],
    )}`,
  )

  console.log()
  console.log(` ${styleText('cyan', '.npmrc')} created`)
} catch (error) {
  console.error('Failed to initialize project', error)
}
