function getDefaultCode(language) {
  const defaultCodes = {
    javascript: `// Welcome to CodeCollab!
// Write your JavaScript code here

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));

// Try running this code!`,

    python: `# Welcome to CodeCollab!
# Write your Python code here

def greet(name):
    return f"Hello, {name}!"

print(greet("World"))

# Try running this code!`,

    html: `<!DOCTYPE html>
<html>
<head>
  <title>Welcome to CodeCollab!</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Write your HTML code here</p>
</body>
</html>`,

    css: `/* Welcome to CodeCollab! */
/* Write your CSS code here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}`,

    java: `// Welcome to CodeCollab!
// Write your Java code here
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,

    cpp: `// Welcome to CodeCollab!
// Write your C++ code here
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,
  };

  return (
    defaultCodes[language] ||
    `// Welcome to CodeCollab!\n// Language: ${language}`
  );
}

module.exports = getDefaultCode;
