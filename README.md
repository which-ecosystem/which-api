# which-api
REST API for [Which](https://github.com/ilyayudovin/which/) - social web-app focused on choosing between two options (images). 

## Development :hammer_and_wrench:
Track our progress - [KANBAN board](https://github.com/orgs/which-ecosystem/projects/1):fire:

### Technology stack
- [Typescript](https://www.typescriptlang.org/)
- [Feathers-js](https://feathersjs.com/)
- [Mongoose](https://mongoosejs.com/)


### Building and running

#### Running in Docker :whale:
You only need to have `Docker` and `docker-compose` installed for this step.
Turn off Mongo service to avoid port conflicts (container also exposes port 2707).
```
docker-compose up
```
This will build and run `which-api` container along with linked `mongo` container.


#### For local development :construction:
You need to have Mongo running at port 27017.
```
npm install
npm start
```


## Deployment :rocket:
Despite having Docker setup, `which-api` is currently deployed to [Heroku](https://dashboard.heroku.com/),
and MongoDB is located in [Mongo Atlas](https://www.mongodb.com/cloud/atlas).

**API BASE URL**: https://which-api.herokuapp.com/

**MONGODB_URI**: mongodb+srv://cluster0.iayve.mongodb.net/which

