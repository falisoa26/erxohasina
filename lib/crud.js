export async function postUser(userToPost) {
    try {
        const res = await fetch("http://localhost:4400/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(userToPost)
        })

    } catch (error) {
        console.error(error);
    }

}