import { AsyncDatabase } from "promised-sqlite3";

async function getWhoAmI() {
    const db = await AsyncDatabase.open("./notes.db");
    return db.get("SELECT * FROM users WHERE id = ?", ["1"]);
}

export default async function WhoAmI() {
    const user = await getWhoAmI();

    return (
        <div>
            <h1>Who Am I?</h1>
            <p>
                You are {user.name} and your id is {user.id}
            </p>
        </div>
    );
}