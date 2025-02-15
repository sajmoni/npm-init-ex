import path from 'node:path'
import { readFile } from 'node:fs/promises'

import { expect, test } from 'vitest'
import spawn from 'nano-spawn'
import { temporaryDirectory } from 'tempy'
import { readPackage } from 'read-pkg'
import { getBinPath } from 'get-bin-path'

test('npm-init-ex', async () => {
  const binPath = await getBinPath()
  if (!binPath) {
    throw new Error('Bin path not found')
  }
  const directory = temporaryDirectory({ prefix: 'hello-world' })
  const { stdout } = await spawn(binPath, [], {
    cwd: directory,
    env: {
      FORCE_COLOR: '2',
    },
  })

  const packageJson = await readPackage({
    cwd: directory,
    normalize: false,
  })
  const npmrc = await readFile(path.join(directory, '.npmrc'))
  expect(npmrc.toString()).toEqual('save-exact=true')

  // Since the directory name will be different each time, we only assert the prefix part
  expect(packageJson.name?.includes('hello-world')).toBeTruthy()

  expect(packageJson.version).toEqual('0.0.0')
  expect(packageJson.license).toEqual('MIT')
  expect(packageJson.files).toEqual(['dist/'])
  expect(packageJson.main).toEqual('dist/index.js')
  expect(packageJson.bin).toEqual('dist/index.js')
  expect(packageJson.type).toEqual('module')
  expect(packageJson.engines).toEqual({
    node: '>=22',
  })

  console.log('stdout', stdout)
  expect(stdout).toMatchSnapshot()
})
