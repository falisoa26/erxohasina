export async function deleteUser (id) {
    try {
        const res = await fetch(`http://localhost:4400/users/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}