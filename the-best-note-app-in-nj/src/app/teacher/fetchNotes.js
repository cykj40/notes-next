"use server";


import { AsyncDatabase } from "promised-sqlite3";

export default async function fetchNotes(since) {
    const db = await AsyncDatabase.open("./notes.db");
    let rows;
    if (since) {
        rows = await db.all(
            "SELECT n.id AS id, n.note AS note, f.name AS from_user, t.name AS to_user FROM notes n JOIN users f ON f.id = n.from_user JOIN users t ON t.id = n.to_user WHERE n.id > ? ORDER BY n.id LIMIT 50",
            [since]
        );
    } else {
        rows = await db.all(
            "SELECT n.id AS id, n.note AS note, f.name AS from_user, t.name AS to_user FROM notes n JOIN users f ON f.id = n.from_user JOIN users t ON t.id = n.to_user ORDER BY n.id LIMIT 50"
        );
    }
    return rows;
}
