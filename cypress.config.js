const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        generateFakeUser() {
          const userData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            username: faker.internet.username(),
            password: 'Cz1!qw2@#34'
          };
          // Caminho para salvar o JSON
          const filePath = path.join(__dirname, 'cypress', 'fixtures', 'fakeUser.json');

          fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf-8');

          return userData;
        },
        salvarUsuario(user){
          const filePath = path.resolve('cypress/fixtures/fakeUser.json');
          fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
          return null;
        }
      });
    },
  },
};



