import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('imageUrl'),
    subscription: boolean('subscription').default(false),
    credits: integer('credits').default(30)
});

export const VideoData = pgTable('videoData', {
    id: serial('id').primaryKey(),
    videoScript: json('script').notNull(),
    audioFileUrl: varchar('audioFileUrl').notNull(),
    captions: json('captions').notNull(),
    imageList: varchar('imageList').array(),
    createdBy: varchar('createdBy').notNull()
});

export const UserSubscription = pgTable('userSubscription', {
    id: serial('id').primaryKey(),
    email:varchar('email'),
    userName: varchar('userName'),
    active:boolean('active'),
    paymentId: varchar('paymentId'),
    joinDate: varchar('joinDate')
});