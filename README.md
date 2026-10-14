
# My Gastronomy 🍽️

Aplicação React + Vite para explorar pratos e criar pedidos. O frontend usa autenticação JWT, rotas protegidas, cliente HTTP centralizado, timeout de requisições e pipeline CI com lint, build, auditoria de dependências e CodeQL.

## Segurança

- Tokens são validados localmente quanto à expiração e não são registrados em logs.
- Requisições autenticadas usam `Authorization: Bearer`.
- Rotas de perfil e carrinho exigem sessão válida.
- Em produção, o container usa build multi-stage, Nginx e usuário não-root.
- O token em `localStorage` é uma limitação conhecida; a solução ideal é migrar para cookie `HttpOnly`, `Secure` e `SameSite` com suporte do backend.

## Desenvolvimento

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Configure a API copiando `.env.example` para `.env.local`. Nunca coloque segredos em variáveis `VITE_*`, pois elas são expostas no bundle do navegador.

💡 Features

Browse a collection of recipes with images, titles, and descriptions.

Search recipes by name or category.

View detailed recipe pages with ingredients and instructions.

Responsive layout for desktop, tablet, and mobile devices.

Smooth navigation using React Router.

🛠️ Technologies Used

React 18

Vite (fast modern bundler)

React Router for page navigation

CSS/SCSS for styling

Optional: Integration with recipe APIs or JSON data for dynamic content

⚡ Installation

Follow these steps to run the project locally:

Clone the repository:

git clone https://github.com/your-username/my-gastronomy.git
cd my-gastronomy


Install dependencies:

npm install


Start the development server:

npm run dev


Open the application in your browser:

The terminal will display:

Local:   http://localhost:5173/


Open this URL to explore My Gastronomy.

📂 Project Structure
my-gastronomy/
│
├─ public/           # Static assets (images, icons, favicon)
├─ src/
│   ├─ components/   # Reusable React components (RecipeCard, Navbar, Footer)
│   ├─ pages/        # Pages (Home, RecipeDetails, Categories)
│   ├─ data/         # Optional static recipe data
│   ├─ App.jsx       # Main React component
│   └─ main.jsx      # Vite entry point
├─ package.json
├─ vite.config.js
└─ README.md

🎨 Customization

Add or update recipes by modifying src/data/recipes.json or integrating an API.

Update styling via CSS/SCSS files in src/components or src/pages.

Extend features with favorites, ratings, or user comments.

⚙️ Production Build

To generate an optimized build for deployment:

npm run build


The output will be in the dist/ folder, ready for deployment on GitHub Pages, Netlify, Vercel, or any static hosting.

📌 Notes

Built with React + Vite for high performance and fast development.

Fully responsive and optimized for mobile, tablet, and desktop.

Easy to extend with new features or additional recipe content.
