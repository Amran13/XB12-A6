
### 1. **What is the difference between `var`, `let`, and `const`?**

- **`var`**:
  - Function-scoped.
  - Can be redeclared and updated.
  
- **`let`**:
  - Block-scoped.
  - Can be updated, but not redeclared in the same scope.

- **`const`**:
  - Block-scoped.
  - Cannot be updated or redeclared.
  - Must be initialized during declaration.

---

### 2. **What is the difference between `map()`, `forEach()`, and `filter()`?**

- **`map()`**:
  - Creates a new array by applying a function to each element.
  
- **`forEach()`**:
  - Executes a function on each element, but returns `undefined` (does not create a new array).
  
- **`filter()`**:
  - Creates a new array with elements that pass a test defined by the provided function.

---

### 3. **What are arrow functions in ES6?**

- **Arrow functions** provide a shorter syntax for writing functions.
- They don't have their own `this`, instead, they inherit `this` from the surrounding context.

---

### 4. **How does destructuring assignment work in ES6?**

- Destructuring allows unpacking values from arrays or properties from objects into distinct variables.
- It simplifies extracting multiple properties or elements from data structures.

---

### 5. **Explain template literals in ES6. How are they different from string concatenation?**

- **Template literals** are string literals that allow embedded expressions, using backticks (`` ` ``) and `${}` for interpolation.
- They provide easier multi-line strings and variable interpolation compared to string concatenation.


