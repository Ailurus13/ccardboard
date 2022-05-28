# Ccardboard

## Installation

### Node

Install NodeJS 16.15.0 or later.

More details at https://nodejs.org/en/

### node-gyp

Electron use node-gyp and need :

- Python
- C++ compiler

More details at https://github.com/nodejs/node-gyp

**Troubleshooting**

```
npm config set msvs_version 2022
npm config set msbuild_path "C:\Program Files\Microsoft Visual Studio\2022\Community\Msbuild\Current\Bin\MSBuild.exe"
```

### More configuration

Git CRLF

```
git config core.autocrlf false
```
