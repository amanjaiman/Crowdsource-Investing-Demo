import { execSync } from "child_process";

try {
  // Install dependencies
  console.log("Installing dependencies...");
  execSync(
    "npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms",
    { stdio: "inherit" }
  );

  // Initialize Tailwind CSS
  console.log("Initializing Tailwind CSS...");
  execSync("npx tailwindcss init -p", { stdio: "inherit" });

  console.log("Setup complete! 🎉");
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
