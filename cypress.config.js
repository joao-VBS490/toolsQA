module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
    import {defineConfig} from 'cypress';
    import {faker} from '@faker-js/faker';
    
      export default defineConfig({
        e2e: { 
          setupNodeEvents(on, config){
              on('task', {generateFakeUser() {
                let name = faker.person.firstName();
                let lastName = faker.person.lastName();
                let nickname = faker.internet.username();
                let password = "Cz1!qw2@#34"
              }

            })
          }
        }
      })
    },
  },
};
