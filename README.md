### Next To Typescript

<a aria-label="NPM version" href="https://www.npmjs.com/package/next-to-ts">
    <img alt="" src="https://img.shields.io/npm/v/next-to-ts.svg?style=for-the-badge&labelColor=000000">
  </a>

Migrate your Next.js Project from javaScript to typescript in seconds

### Get started


Make sure you are inside a next.js Project


Execute


```bash
npx next-to-ts
```
or

```bash
pnpx next-to-ts
```


### What does it do



- It moves file these directories to typescript respectively.

```
  components
    |
    |__ jsx,js --> tsx

  lib
    |
    |
    |__ js --> ts

  pages or src/pages
    |
    |__api
    |   |
    |   |__.js --> .ts
    |
    |_____.jsx,.js -> .tsx
```

- Installs all necessary packages.
- sets up standard `tsconfig.json` for next.js apps
- Have any idea to add one file an Issue or PR


### Licence

This project is under [MIT](https://github.com/ImBIOS/next-to-ts/blob/master/LICENSE) Licence

This project was created based on [next2ts](https://github.com/makuzaverite/next2ts)
