import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({em: orm.em})
    });

    apolloServer.applyMiddleware({ app });

    // app.get('/test', (_, res) => {
    //     res.send('localshot');
    // });

    app.listen(4000, ()=> {
        console.log('started at port 4000');
    });
    // const post = orm.em.create(Post, {title: 'my first post'});
    // await orm.em.persistAndFlush(post);
    // const posts = await orm.em.find(Post, {});
    // console.log(posts);
};

main().catch(err => {
    console.error(err);
});


