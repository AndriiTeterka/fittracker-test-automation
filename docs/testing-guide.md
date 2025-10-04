# Testing Guide - FitTracker Test Automation

Comprehensive guide for testing the FitTracker application with Playwright, REST Assured, and Appium.

## 🎯 Testing Strategy

### Test Pyramid
```
           🔺 E2E Tests (UI + API + Mobile)
          🔺🔺 Integration Tests (API)
         🔺🔺🔺 Unit Tests (Components)
```

### Test Types
- **Unit Tests**: React components, utilities, hooks
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: Complete user workflows
- **Mobile Tests**: Mobile-specific functionality
- **Performance Tests**: Load testing, response times

## 🎭 Playwright Testing (Web UI)

### Setup

```bash
cd frontend
npm install
npm run test:playwright
```

### Configuration

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
})
```

### Test Examples

#### Authentication Flow

```typescript
// tests/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    // Fill login form
    await page.fill('[data-testid="email-input"]', 'john.doe@fittracker.com')
    await page.fill('[data-testid="password-input"]', 'User123!')
    
    // Submit form
    await page.click('[data-testid="login-button"]')
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid="user-welcome"]')).toContainText('Welcome, John')
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'invalid@email.com')
    await page.fill('[data-testid="password-input"]', 'wrongpassword')
    
    await page.click('[data-testid="login-button"]')
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials')
  })

  test('should validate form inputs', async ({ page }) => {
    // Test empty email
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Email is required')
    
    // Test invalid email format
    await page.fill('[data-testid="email-input"]', 'invalid-email')
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Invalid email format')
  })
})
```

#### Workout Management

```typescript
// tests/workouts.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Workout Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test user
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'john.doe@fittracker.com')
    await page.fill('[data-testid="password-input"]', 'User123!')
    await page.click('[data-testid="login-button"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('should create new workout', async ({ page }) => {
    // Navigate to workouts
    await page.click('[data-testid="nav-workouts"]')
    await expect(page).toHaveURL('/workouts')
    
    // Click create workout button
    await page.click('[data-testid="create-workout-button"]')
    
    // Fill workout form
    await page.fill('[data-testid="workout-name"]', 'Test Workout')
    await page.fill('[data-testid="workout-description"]', 'Test Description')
    await page.fill('[data-testid="workout-duration"]', '45')
    await page.selectOption('[data-testid="workout-status"]', 'planned')
    
    // Submit form
    await page.click('[data-testid="save-workout"]')
    
    // Verify workout appears in list
    await expect(page.locator('[data-testid="workout-list"]')).toContainText('Test Workout')
  })

  test('should filter workouts by date', async ({ page }) => {
    await page.goto('/workouts')
    
    // Set date filter
    await page.fill('[data-testid="date-from"]', '2025-10-01')
    await page.fill('[data-testid="date-to"]', '2025-10-31')
    await page.click('[data-testid="apply-filter"]')
    
    // Wait for results to load
    await page.waitForSelector('[data-testid="workout-item"]')
    
    // Verify all workouts are within date range
    const workoutDates = await page.locator('[data-testid="workout-date"]').allTextContents()
    workoutDates.forEach(date => {
      const workoutDate = new Date(date)
      expect(workoutDate >= new Date('2025-10-01')).toBe(true)
      expect(workoutDate <= new Date('2025-10-31')).toBe(true)
    })
  })

  test('should edit existing workout', async ({ page }) => {
    await page.goto('/workouts')
    
    // Click edit on first workout
    await page.click('[data-testid="workout-item"]:first-child [data-testid="edit-workout"]')
    
    // Update workout name
    await page.fill('[data-testid="workout-name"]', 'Updated Workout Name')
    await page.click('[data-testid="save-workout"]')
    
    // Verify update
    await expect(page.locator('[data-testid="workout-list"]')).toContainText('Updated Workout Name')
  })
})
```

### Page Object Model

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email-input"]', email)
    await this.page.fill('[data-testid="password-input"]', password)
    await this.page.click('[data-testid="login-button"]')
  }

  async getErrorMessage() {
    return await this.page.locator('[data-testid="error-message"]').textContent()
  }
}
```

## 🔧 REST Assured Testing (API)

### Setup

Add to `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.3.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.15.2</version>
    </dependency>
</dependencies>
```

### Base Test Class

```java
// BaseApiTest.java
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.annotations.BeforeClass;

public class BaseApiTest {
    protected static final String BASE_URL = "https://your-project.supabase.co/rest/v1";
    protected static final String API_KEY = "your-anon-key";
    protected static String authToken;
    
    @BeforeClass
    public void setup() {
        RestAssured.baseURI = BASE_URL;
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
        
        // Authenticate test user
        authToken = authenticateUser("john.doe@fittracker.com", "User123!");
    }
    
    private String authenticateUser(String email, String password) {
        Response response = RestAssured
            .given()
                .header("apikey", API_KEY)
                .header("Content-Type", "application/json")
                .body("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}")
            .when()
                .post("https://your-project.supabase.co/auth/v1/token?grant_type=password")
            .then()
                .statusCode(200)
                .extract().response();
        
        return response.jsonPath().getString("access_token");
    }
}
```

### API Test Examples

#### User Management Tests

```java
// UserApiTest.java
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class UserApiTest extends BaseApiTest {
    
    @Test
    public void testGetUserProfile() {
        given()
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + authToken)
        .when()
            .get("/users?select=*")
        .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].email", equalTo("john.doe@fittracker.com"))
            .body("[0].username", notNullValue());
    }
    
    @Test
    public void testUpdateUserProfile() {
        String updatePayload = """
            {
                "username": "updated_username",
                "age": 30
            }
            """;
        
        given()
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + authToken)
            .header("Content-Type", "application/json")
            .header("Prefer", "return=representation")
            .body(updatePayload)
        .when()
            .patch("/users?email=eq.john.doe@fittracker.com")
        .then()
            .statusCode(200)
            .body("[0].username", equalTo("updated_username"))
            .body("[0].age", equalTo(30));
    }
    
    @Test
    public void testUnauthorizedAccess() {
        given()
            .header("apikey", API_KEY)
            // Missing Authorization header
        .when()
            .get("/users")
        .then()
            .statusCode(401);
    }
}
```

#### Workout API Tests

```java
// WorkoutApiTest.java
public class WorkoutApiTest extends BaseApiTest {
    
    @Test
    public void testCreateWorkout() {
        String workoutPayload = """
            {
                "name": "API Test Workout",
                "description": "Created via API test",
                "duration_minutes": 45,
                "calories_burned": 300,
                "workout_date": "2025-10-04",
                "status": "planned"
            }
            """;
        
        given()
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + authToken)
            .header("Content-Type", "application/json")
            .header("Prefer", "return=representation")
            .body(workoutPayload)
        .when()
            .post("/workouts")
        .then()
            .statusCode(201)
            .body("[0].name", equalTo("API Test Workout"))
            .body("[0].duration_minutes", equalTo(45))
            .body("[0].status", equalTo("planned"));
    }
    
    @Test
    public void testGetWorkouts() {
        given()
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + authToken)
            .queryParam("select", "*")
            .queryParam("order", "created_at.desc")
            .queryParam("limit", "10")
        .when()
            .get("/workouts")
        .then()
            .statusCode(200)
            .body("size()", lessThanOrEqualTo(10))
            .body("[0].name", notNullValue())
            .body("[0].created_at", notNullValue());
    }
    
    @Test
    public void testWorkoutValidation() {
        String invalidWorkout = """
            {
                "name": "",
                "duration_minutes": -5,
                "calories_burned": "invalid"
            }
            """;
        
        given()
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + authToken)
            .header("Content-Type", "application/json")
            .body(invalidWorkout)
        .when()
            .post("/workouts")
        .then()
            .statusCode(anyOf(is(400), is(422)));
    }
}
```

### Data-Driven Tests

```java
// DataProviders.java
@DataProvider(name = "workoutData")
public Object[][] workoutTestData() {
    return new Object[][] {
        {"Cardio Session", "High intensity cardio", 30, 250, "completed"},
        {"Strength Training", "Upper body workout", 60, 400, "completed"},
        {"Yoga Flow", "Relaxing yoga session", 45, 150, "planned"}
    };
}

@Test(dataProvider = "workoutData")
public void testCreateMultipleWorkouts(String name, String description, 
                                       int duration, int calories, String status) {
    // Test implementation using provided data
}
```

## 📱 Appium Testing (Mobile)

### Setup

Add to `pom.xml`:

```xml
<dependency>
    <groupId>io.appium</groupId>
    <artifactId>java-client</artifactId>
    <version>8.6.0</version>
</dependency>
```

### Base Mobile Test

```java
// BaseMobileTest.java
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

public class BaseMobileTest {
    protected AppiumDriver driver;
    
    @BeforeClass
    @Parameters({"platform", "deviceName", "app"})
    public void setup(String platform, String deviceName, String app) {
        DesiredCapabilities caps = new DesiredCapabilities();
        
        if (platform.equalsIgnoreCase("android")) {
            caps.setCapability("platformName", "Android");
            caps.setCapability("deviceName", deviceName);
            caps.setCapability("app", app);
            caps.setCapability("automationName", "UiAutomator2");
            driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), caps);
        } else if (platform.equalsIgnoreCase("ios")) {
            caps.setCapability("platformName", "iOS");
            caps.setCapability("deviceName", deviceName);
            caps.setCapability("app", app);
            caps.setCapability("automationName", "XCUITest");
            driver = new IOSDriver(new URL("http://localhost:4723/wd/hub"), caps);
        }
        
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
    
    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Mobile Test Examples

```java
// MobileLoginTest.java
public class MobileLoginTest extends BaseMobileTest {
    
    @Test
    public void testMobileLogin() {
        // Find and interact with mobile elements
        WebElement emailInput = driver.findElement(By.id("email_input"));
        WebElement passwordInput = driver.findElement(By.id("password_input"));
        WebElement loginButton = driver.findElement(By.id("login_button"));
        
        emailInput.sendKeys("john.doe@fittracker.com");
        passwordInput.sendKeys("User123!");
        loginButton.click();
        
        // Verify successful login
        WebElement welcomeMessage = driver.findElement(By.id("welcome_text"));
        Assert.assertTrue(welcomeMessage.getText().contains("Welcome"));
    }
    
    @Test
    public void testMobileNavigation() {
        // Test mobile-specific navigation
        driver.findElement(By.id("hamburger_menu")).click();
        driver.findElement(By.id("nav_workouts")).click();
        
        WebElement workoutsHeader = driver.findElement(By.id("workouts_header"));
        Assert.assertEquals(workoutsHeader.getText(), "My Workouts");
    }
}
```

## 🧪 Test Data Management

### Test Data Setup

```java
// TestDataManager.java
public class TestDataManager {
    private static final String CLEANUP_ENDPOINT = "/rpc/cleanup_test_data";
    private static final String CREATE_SAMPLE_DATA_ENDPOINT = "/rpc/create_sample_workouts_for_user";
    
    public static void cleanupTestData() {
        given()
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + getAdminToken())
        .when()
            .post(CLEANUP_ENDPOINT)
        .then()
            .statusCode(200);
    }
    
    public static void createSampleData(String userId) {
        given()
            .header("apikey", API_KEY)
            .header("Authorization", "Bearer " + getAdminToken())
            .header("Content-Type", "application/json")
            .body("{\"target_user_id\":\"" + userId + "\"}")
        .when()
            .post(CREATE_SAMPLE_DATA_ENDPOINT)
        .then()
            .statusCode(200);
    }
}
```

### Database Utilities

```typescript
// test-utils/database.ts
export class DatabaseTestUtils {
  static async resetTestData() {
    const { error } = await supabase.rpc('cleanup_test_data')
    if (error) throw error
  }
  
  static async createTestUser(userData: any) {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: userData.profile
      }
    })
    if (error) throw error
    return data
  }
  
  static async createSampleWorkouts(userId: string) {
    const { error } = await supabase.rpc('create_sample_workouts_for_user', {
      target_user_id: userId
    })
    if (error) throw error
  }
}
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '11'
      - run: mvn test -Dtest=*ApiTest
      
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install
      - name: Run Playwright tests
        run: npm run test:playwright
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📊 Test Reporting

### Custom Reporter

```typescript
// test-utils/custom-reporter.ts
class FitTrackerReporter {
  onTestComplete(result: TestResult) {
    // Send results to external reporting system
    // Generate custom metrics
    // Update test dashboard
  }
  
  generateSummaryReport() {
    return {
      totalTests: this.totalTests,
      passed: this.passedTests,
      failed: this.failedTests,
      coverage: this.testCoverage,
      performance: this.performanceMetrics
    }
  }
}
```

## 🎯 Best Practices

### Test Organization
1. **Separate concerns**: UI, API, and Mobile tests in different packages
2. **Use Page Object Model**: Encapsulate page/screen interactions
3. **Data-driven tests**: Parameterize test cases
4. **Independent tests**: Each test should be able to run in isolation

### Test Data
1. **Clean slate**: Reset test data before each test suite
2. **Realistic data**: Use data that mirrors production scenarios
3. **Edge cases**: Test boundary conditions and error scenarios
4. **Security**: Test authentication and authorization

### Maintenance
1. **Regular updates**: Keep selectors and test data current
2. **Documentation**: Document test scenarios and expected outcomes
3. **Monitoring**: Track test execution metrics and failure patterns
4. **Refactoring**: Regularly improve test code quality

---

**Happy Testing! 🚀**