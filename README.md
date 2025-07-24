# Vulnyzer
This repository represents our development of a tool that support model-based vulnerability analysis of a given software.

# Code Analysis Platform - README

## 1. Infer Installation (Semantic Analysis Engine)

### Step 1: Install Docker
1. Visit [https://www.docker.com/](https://www.docker.com/) and download Docker Desktop for Windows.
2. Run the installer (`Docker Desktop Installer.exe`) and follow the setup process.

### Step 2: Set Up Infer Using Docker
1. Download the Infer release ZIP from: [https://github.com/facebook/infer/releases](https://github.com/facebook/infer/releases)
2. Extract the ZIP (e.g., `infer-1.1.0.zip`) using 7-Zip or another tool.
3. Open Command Prompt as Administrator and run:
   ```bash
   cd "C:\Users\YourUsername\Desktop\Infer\infer-1.1.0\docker\master-java"
   docker build -t infer .
   docker run -it -v /../../examples infer /bin/bash
   ```
4. Inside the Docker container:
   ```bash
   apt-get update
   apt-get install sudo
   sudo apt install sqlite3
   ```

### Step 3: Install Infer from Source (Optional)
Refer to the official build guide:
```bash
git clone https://github.com/facebook/infer.git
cd infer
./build-infer.sh java
sudo make install
```

### Step 4: Run Test Scenarios
```bash
cd /infer/examples
infer run -- javac Hello.java
cd Test
infer run -- javac HelloTest.java
```

**Example `Hello.java`:**
```java
class Hello {
  int test() {
    String s = null;
    return s.length();
  }
}
```

## 2. PMD Installation (Syntactic Analysis Engine)

### Step 1: Install Requirements
- Java 8 or above (e.g., Adoptium, Azul)
- A ZIP extraction tool (e.g., 7-Zip)

### Step 2: Download and Configure PMD
1. Download `pmd-dist-7.14.0-bin.zip` from PMD GitHub Releases.
2. Extract the archive to `C:\pmd-bin-7.14.0`.
3. Add `C:\pmd-bin-7.14.0\bin` to your system PATH.
4. Test it by running:
   ```bash
   pmd.bat check -d c:\src -R rulesets/java/quickstart.xml -f text
   ```

### PMD Rule Designer (Optional)
```bash
cd D:\PMD\pmd-bin-6.55.0\bin
./designer.bat
```

## 3. Web Application Overview

- **Application Portal**: View code analysis results
- **Admin Panel**: Run analyses, manage rules, view threat modeling

## 4. Using the Admin Panel

### Login to Access:
- Trade Rules
- Trade Analysis

### Trade Rules Workflow:
1. Select a category (e.g., CAPEC, MITRE ATT&CK)
2. Choose a rule like “CWE-580: `clone()` Method without `super.clone`.”
3. View threat data (ID, link, source, description)

### Trade Analysis:
1. Select a project and rule type (syntactic or semantic)
2. Results are visualized as STIX diagrams and rule views
   

## 5. Framework Integrations

- Command-line processes are exposed via Web API
- Web API integrates with Docker for Infer execution
- PMD rule execution also controlled via API
- STIX outputs and threat models visualized in the UI


## 6. TRADES Threat Modelling Integration

- TRADES provides a diagrammatic threat modeling interface
- Users can drag predefined threats (e.g., “CAPEC: Absolute Path Traversal”)
- Threat properties and metadata are displayed dynamically
- Data sources (from `.jar` or converted `.xml`) are loaded under “Trade Rules”

