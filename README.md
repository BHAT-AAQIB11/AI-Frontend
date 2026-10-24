# AI Frontend (Local LLM Interface)

A responsive web interface built to interact with Large Language Models (LLMs) running locally on your machine. This frontend connects seamlessly to an **Ollama** backend instance to provide chat-based AI experience.

> ⚠️ **Work in Progress:** This project is under active development.

## 🚧 Project Status & Current Capabilities

This project is currently a **Work in Progress (WIP)**.

### What works right now:

- Connecting to a local Ollama instance.
- Initializing a basic chat interface.
- Handling active conversations stored temporarily in React state.

## 🚀 Features

- **Local & Private:** Your data never leaves your machine.
- **Fast & Lightweight:** Built using Vite, React, and TypeScript.

---

### 🛠️ Prerequisites & Local AI Setup

To use this frontend, you must have Ollama installed and running locally on your terminal. Follow the setup instructions below.

**1. Install Ollama**

To get started, download and install Ollama directly from the [Official Ollama Download Page](https://ollama.com).

### 2. Verify Ollama is Running

Ensure the Ollama service is active. You can check by running:

```bash
ollama --version
```

---

## 🤖 Model Installation Instructions

You can load LLMs into Ollama using two different methods depending on your workflow.

### Method 1: Pull Directly from the Ollama Registry

This is the quickest way to download and run optimized models directly from Ollama's manifest registry.

1. **Pull and run the model** (e.g., Llama 3, Mistral, or Phi-3):
   ```bash
   ollama run llama3
   ```
2. The model will automatically download, load into your terminal, and be exposed to the local API endpoint (`http://localhost:11434`).

### Method 2: Manual Download (Hugging Face GGUF) & Modelfile

Use this method if you want to download a specific fine-tune or quantified model (.gguf format) from Hugging Face or another model hub.

1. **Download the GGUF file** from Hugging Face (e.g., `Meta-Llama-3-8B-Instruct.Q4_K_M.gguf`).

2. **Generate the Modelfile** containing the base path declaration:

   ```bash
   echo "FROM /path/to/your/downloaded-model.gguf" > Modelfile
   ```

3. **Build and register the custom image** into the local Ollama instance:

   ```bash
   ollama create my-custom-model -f ./Modelfile
   ```

4. **Execute and test your newly created model**:
   ```bash
   ollama run my-custom-model
   ```

## ⚙️ Configuring Ollama (Host & CORS Setup)

To ensure your frontend can communicate securely with your Ollama backend without running into network or CORS blockages, you must explicitly configure your host address and cross-origin (CORS) settings.

> [IMPORTANT]
> Environment configurations are strictly evaluated during server initialization. **You must quit and completely restart the Ollama application or service after applying these changes** for them to take effect.

---

### 🍎 macOS Setup

#### For the standalone macOS Desktop App

Because the menu-bar app runs via the macOS launcher background backend (`launchd`), standard shell profile exports are ignored. Use `launchctl` instead:

1. Open your terminal.
2. Set the environment variables globally using [macOS launchctl](https://docs.ollama.com/faq "Ollama Environment Variables FAQ"):
   ```bash
   launchctl setenv OLLAMA_ORIGINS "http://localhost:5173"
   launchctl setenv OLLAMA_HOST "127.0.0.1:11434"
   ```
3. **Quit and fully restart** your Ollama menu-bar application.

#### For Terminal-driven or Homebrew Service execution

If you run Ollama manually via the command line or as a standard terminal process:

1. Open your terminal.
2. Open or create your global shell configuration profile using `nano`:
   ```bash
   nano ~/.zshrc
   ```
   _(If you use bash instead of zsh, run `nano ~/.bash_profile`)_
3. Add the following lines to the bottom of the file:
   ```bash
   export OLLAMA_ORIGINS="http://localhost:5173"
   export OLLAMA_HOST="127.0.0.1:11434"
   ```
4. Press `Ctrl + O` then `Enter` to save, and `Ctrl + X` to exit the editor.
5. Apply the changes immediately:
   ```bash
   source ~/.zshrc
   ```
6. Relaunch your terminal service process.

---

### 🪟 Windows Setup

1. **Close Ollama completely** from your Windows system tray icon (bottom right corner).
2. Open the **Start Menu**, search for **Environment Variables**, and select **Edit the system environment variables**.
3. Under **User variables**, click **New...** and add the first variable:
   - **Variable name:** `OLLAMA_ORIGINS`
   - **Variable value:** `http://localhost:5173`
4. Click **New...** again to add the second variable:
   - **Variable name:** `OLLAMA_HOST`
   - **Variable value:** `127.0.0.1:11434`
5. Click **OK** on all windows to save the settings, and relaunch the Ollama application.

---

### 🐧 Linux / Termux Setup

#### For systemd Service Configurations (Most Common Linux Installs)

Standard Linux service environments boot prior to shell user initializations and ignore `~/.bashrc`. Edit the [Linux Systemd Unit](https://docs.ollama.com/faq "Ollama Linux Environment Variables Service FAQ Setup") explicitly:

1. Open your terminal and edit the service config:
   ```bash
   sudo systemctl edit ollama.service
   ```
2. A text editor will open. Append your environment settings directly within the configuration layout:
   ```ini
   [Service]
   Environment="OLLAMA_ORIGINS=http://localhost:5173"
   Environment="OLLAMA_HOST=127.0.0.1:11434"
   ```
3. Save the file and close the editor.
4. Reload the daemon profiles and safely restart the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart ollama
   ```

#### For Manual Terminal Execution / Termux Environments

1. Open your terminal application.
2. Edit your shell runtime configuration file:
   ```bash
   nano ~/.bashrc
   ```
3. Append the environment variables to the end of the file:
   ```bash
   export OLLAMA_ORIGINS="http://localhost:5173"
   export OLLAMA_HOST="127.0.0.1:11434"
   ```
4. Press `Ctrl + O` then `Enter` to save, and `Ctrl + X` to exit.
5. Refresh your terminal session to apply changes:
   ```bash
   source ~/.bashrc
   ```

---

## 💻 Frontend Installation & Getting Started

Once Ollama is running your chosen model, clone and start this frontend repository.

### # Clone the Repository

Run the following command to clone the repository to your local machine and navigate into the project directory:

```bash
git clone https://github.com/BHAT-AAQIB11/AI-Frontend.git
cd AI-Frontend
```

### 1. Install Dependencies

This project uses `pnpm` as the package manager.

```bash
pnpm install
```

### 2. Run the Development Server

Use this option if you want to modify the source code with hot-reloading active.

```bash
pnpm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 3. Build & Run for Production (Recommended)

Use this option to compile the project into a highly optimized build for active usage.

```bash
pnpm run build
pnpm run preview
```

Open your browser and navigate to the local preview URL provided in your terminal (usually `http://localhost:4173`) to start chatting with your local AI!

---

## 📝 License

This project is open-source and licensed under the **GPL-3.0 License**.
