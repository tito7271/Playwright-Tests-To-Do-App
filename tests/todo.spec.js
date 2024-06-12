const { test, expect } = require ('@playwright/test')

// Verify if a user can add a task
test('user can add a task', async ({page}) => {
    // Arrange
    await page.goto('http://localhost:8080/')

    // Act
    await page.fill('#task-input', 'Test Task')
    await page.click('#add-task')

    // Assert
    const taskText = await page.textContent('.task')
    expect(taskText).toContain('Test Task')
})

// Verify if a user can delete a task
test('user can delete a task', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:8080/')
    await page.fill('#task-input', 'Test Task')
    await page.click('#add-task')

    // Act
    await page.click('.task .delete-task')

    // Assert
    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent))
    expect(tasks).not.toContain('Test Task')
})

// Test if a user can mark a task as complete
test('user can mark a task as complete', async ({page}) => {
    // Arrange 
    await page.goto('http://localhost:8080/')
    await page.fill('#task-input', 'Test Task')
    await page.click('#add-task')

    // Act
    await page.click('.task .task-complete')

    // Assert
    const completedTask = await page.$('.task.completed')
    expect(completedTask).not.toBeNull()
})

// Test if a user can filter tasks
test('user can filter tasks', async ({page}) => {
    // Arrange 
    await page.goto('http://localhost:8080/')
    await page.fill('#task-input', 'Test Task')
    await page.click('#add-task')
    await page.click('.task .task-complete')

    // Act
    await page.selectOption('#filter', 'Completed')

    // Assert
    const incompleteTask = await page.$('.task:not(.completed)')
    expect(incompleteTask).toBeNull()
})