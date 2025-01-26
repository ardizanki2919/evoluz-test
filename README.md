## Evoluz Service Request Feature Testing

This repository contains tests for the **Tambah Permintaan Pelayanan** feature on the **Evoluz** website.

### Testing Framework

The tests are written using **Playwright**, a powerful framework for end-to-end testing in modern web applications.

### Test Cases

You can view the test cases created for this feature on the following [Google Sheets](https://docs.google.com/spreadsheets/d/1YAp2CHZVO0tag3jwXdcIoClVVWARzcSRcB0VOZCsKp4/edit?usp=sharing).

### Prerequisites
- Node.js installed on your machine

### How to Use

Follow the steps below to set up and run the tests:

#### 1. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/ardizanki2919/evoluz-test.git
```

#### 2. Install Dependencies

Navigate to the project directory and install the required dependencies using npm.

```bash
cd evoluz-test
npm install
```

#### 3. Set Up Environment Variables

Create a .env file in the root directory, and set its values based on the provided .env.example file.

#### 4. Running Playwright Tests

To run the Playwright tests, use the following command:

```bash
npx playwright test
```

```bash
npx playwright show-report
```

or

Run tests in UI mode
```bash
npx playwright test --ui
```

### Usage Video

For a quick demonstration of how to use this testing setup, refer to the following video link: [Usage Video](https://drive.google.com/file/d/1PWBP9CONMEi3FCx1-sOeH4LaQ8NGzu78/view?usp=sharing)

### Areas for Improvement

While the tests cover the essential features, there are still areas that need optimization:

- **Timeout**
- **Locator**
- **Scrolling**
- **Data Import**

### License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.