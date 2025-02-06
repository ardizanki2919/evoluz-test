## Evoluz Service Request Feature Testing

This repository contains tests for the **Tambah Permintaan Pelayanan** feature on the **Evoluz** website.

### Testing Framework

Tests are written using  **Playwright**, a powerful end-to-end testing framework for modern web applications.

### Test Cases

You can view the test cases created for this feature on the following [Google Sheets](https://docs.google.com/spreadsheets/d/1YAp2CHZVO0tag3jwXdcIoClVVWARzcSRcB0VOZCsKp4/edit?usp=sharing).

### Prerequisites
- Node.js installed on your machine

## How to Use

#### 1. Clone Repository

```bash
git clone https://github.com/ardizanki2919/evoluz-test.git
```

```bash
cd evoluz-test
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Open Project with Code Editor

Use **VS Code** or **Cursor**.

#### 4. Set Up Environment Variables

Create a .env file in the root directory, using .env.example as a template.

#### 5. Run Playwright Tests

To run tests in UI Mode:

```bash
npx playwright test request-service.spec.ts --ui
```

## Usage Video

For a quick demonstration of how to run this testing , watch the tutorial video at: [Tutorial Video URL](https://drive.google.com/file/d/1PWBP9CONMEi3FCx1-sOeH4LaQ8NGzu78/view?usp=sharing)

## Improvement Areas

While the tests cover the essential features, there are still areas that need optimization:

- [x] Project Structure
- [x] Data Import
- [ ] Upload File
- [x] Timeout
- [x] Locators
- [ ] Scrolling
- [ ] CI/CD with GitHub Actions

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.