"use server";
import { AsyncDatabase } from "promised-sqlite3";
import { redirect } from "next/navigation";

export default async function updateUsername(formdata) {
    console.log("updateUsername Called", formdata);

    const userName = formdata.get("username");
    const id = formdata.get("id");

    if (!userName || !id) {
        throw new Error("no");
    }

    const db = await AsyncDatabase.open("./notes.db");
    await db.run("UPDATE users SET name = ? WHERE id = ?", [userName, id]);
    redirect("/")
}