import { faker } from '@faker-js/faker';
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Script error.')) {
      // Retorna false para ignorar o erro e não falhar o teste
      return false;
    }
    
});
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error.')) {
    return false;
  }
});