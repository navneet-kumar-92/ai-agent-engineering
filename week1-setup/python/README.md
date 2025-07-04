# AI Agent Engineering - Python Setup

A Python project for interacting with large language models using LiteLLM, part of the AI Agent Engineering bootcamp.

## 📋 Overview

This project demonstrates how to interact with OpenAI's GPT models using the LiteLLM library, which provides a unified interface for multiple LLM providers.

## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- [UV](https://github.com/astral-sh/uv) package manager (recommended)

### Installation

1. **Install UV** (if not already installed):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Navigate to the project**:
   ```bash
   cd week1-setup/python
   ```

3. **Sync dependencies** (this will automatically create/activate virtual environment):
   ```bash
   uv sync
   ```

### Environment Setup

1. **Create a `.env` file** in the project root:
   ```bash
   touch .env
   ```

2. **Add your OpenAI API key** to the `.env` file:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

   > ⚠️ **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### Running the Application

```bash
uv run python main.py
```

## 📦 Dependencies

This project uses the following main dependencies:

- **[litellm](https://litellm.ai/)** `>=1.73.6.post1` - Unified interface for multiple LLM providers
- **[python-dotenv](https://pypi.org/project/python-dotenv/)** `>=1.1.1` - Load environment variables from `.env` file

### Dependency Management

Dependencies are managed through `pyproject.toml`:

```toml
[project]
dependencies = [
    "litellm>=1.73.6.post1",
    "python-dotenv>=1.1.1",
]
```

The exact versions are locked in `uv.lock` to ensure reproducible builds.

## 📁 Project Structure

```
python/
├── .venv/              # Virtual environment (auto-created by UV)
├── .env                # Environment variables (create this)
├── .gitignore          # Git ignore rules
├── .python-version     # Python version specification (3.11+)
├── main.py             # Main application file
├── pyproject.toml      # Project configuration & dependencies
├── uv.lock            # Dependency lock file (auto-generated)
└── README.md          # This file
```

## 🔧 Development with UV

### Common UV Commands

```bash
# Sync dependencies (install/update to match lock file)
uv sync

# Add a new dependency
uv add package-name

# Add a development dependency
uv add --dev package-name

# Remove a dependency
uv remove package-name

# Run Python with the project's virtual environment
uv run python main.py

# Run any command in the virtual environment
uv run <command>

# Activate the virtual environment manually (optional)
source .venv/bin/activate
```

### Why UV?

- **⚡ Fast**: 10-100x faster than pip
- **🔒 Reliable**: Deterministic dependency resolution
- **🎯 Simple**: Single tool for dependency management and virtual environments
- **🔄 Compatible**: Works with existing `pyproject.toml` and `requirements.txt`

## 🎯 What the Code Does

The `main.py` file demonstrates a simple LLM interaction:

1. **Loads environment variables** from `.env` file
2. **Makes a completion request** to OpenAI's GPT-4 model
3. **Prints the response** to the console

```python
from litellm import completion
from dotenv import load_dotenv

load_dotenv()

response = completion(
    model="openai/gpt-4o",
    messages=[{"content": "Hello, how are you?", "role": "user"}]
)

print(response.choices[0].message.content)
```

## 🔑 API Keys and Environment Variables

This project requires an OpenAI API key to function. You can get one from:
- [OpenAI Platform](https://platform.openai.com/api-keys)

Set it in your `.env` file:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## 🐛 Troubleshooting

### UV Not Found
If you get `command not found: uv`:
```bash
# Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Restart your shell or run:
source ~/.bashrc  # or ~/.zshrc
```

### Dependencies Not Synced
If you see import errors:
```bash
# Sync dependencies
uv sync

# Run with UV to ensure correct environment
uv run python main.py
```

### API Key Issues
- Ensure your `.env` file exists and contains `OPENAI_API_KEY`
- Check that your API key is valid and has sufficient credits
- Verify the `.env` file is in the same directory as `main.py`

### Python Version
- This project requires Python 3.11+
- Check your version: `uv run python --version`
- UV will use the version specified in `.python-version`

## 🔄 Alternative Setup (Without UV)

If you prefer traditional pip:

```bash
# Create virtual environment
python -m venv .venv

# Activate it
source .venv/bin/activate

# Install dependencies
pip install litellm python-dotenv

# Run the application
python main.py
```

## 📚 Learn More

- [UV Documentation](https://github.com/astral-sh/uv)
- [LiteLLM Documentation](https://docs.litellm.ai/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Python-dotenv Documentation](https://pypi.org/project/python-dotenv/)

## 🤝 Contributing

This is part of the AI Agent Engineering bootcamp. Feel free to experiment and extend the functionality!

### Adding Dependencies

When adding new dependencies, use UV:
```bash
uv add package-name
```

This will automatically update both `pyproject.toml` and `uv.lock`.
