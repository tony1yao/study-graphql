import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";


console.log('__dirname', __dirname);
export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
      },
    dbName: 'postgres',
    user: 'postgres',
    password: 'docker',
    debug: !__prod__,
    type: 'postgresql',
    entities: [Post]
} as Parameters<typeof MikroORM.init>[0];