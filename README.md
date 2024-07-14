# 環境構築

npx create-react-app dashboard-app --template typescript

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

root@d8e798801d45:/workspace/learn-web/dashboard-app# npx shadcn-ui@latest init
✔ Would you like to use TypeScript (recommended)? … no / yes
✔ Which style would you like to use? › Default
? Which color would you like to use as base color? › - Use arrow-keys. Return to
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? … src/index.css
✔ Would you like to use CSS variables for colors? … no / yes
✔ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) … 
✔ Where is your tailwind.config.js located? … tailwind.config.js
✔ Configure the import alias for components: … src/components
✔ Configure the import alias for utils: … src/lib/utils
✔ Are you using React Server Components? … no / yes
✔ Write configuration to components.json. Proceed? … yes

✔ Writing components.json...
✔ Initializing project...
⠙ Installing dependencies...
✔ Installing dependencies...

Success! Project initialization completed. You may now add components.

- 各種コンポーネントの追加
- `npx shadcn-ui@latest add button`
- `npx shadcn-ui@latest add card`
- `npx shadcn-ui@latest add alert-dialog`

- `npm install @radix-ui/react-alert-dialog`
- `npm install react-icons`
- `npm install react-router-dom`